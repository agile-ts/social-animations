import 'hack-font/build/web/hack.css';
import Highlight, {defaultProps} from 'prism-react-renderer';
import React, {useEffect, useState} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import './prism.css';

const getLineStyle = ({
	lineActions,
	frame,
	fps,
}: {
	lineActions: LineActions;
	frame: number;
	fps: number;
}) => {
	if (!lineActions) return {};

	// Get closest action to the current frame
	const closest = lineActions.actions.reduce((a, b) => {
		return Math.abs(b.from - frame) < Math.abs(a.from - frame) ? b : a;
	});

	if (closest.type === 'out') {
		const animation = spring({
			fps,
			frame: frame - closest.from, // if this gets positive the spring animation starts -> when frame gets larger than closest.from
			config: {
				stiffness: 200,
				damping: 100,
				mass: 0.5,
				overshootClamping: true,
			},
			to: 0,
			from: lineActions.currentStyle.opacity ?? 1,
		});

		lineActions.currentStyle['opacity'] = animation;
		lineActions.currentStyle['lineHeight'] = interpolate(
			animation,
			[0, 1],
			[0, 1.53]
		);
		lineActions.currentStyle['fontSize'] = animation + 'em';
	}

	if (closest.type === 'in') {
		const animation = spring({
			fps,
			frame: frame - closest.from,
			config: {
				stiffness: 200,
				damping: 100,
				mass: 0.5,
				overshootClamping: true,
			},
			to: 1,
			from: lineActions.currentStyle.opacity ?? 0,
		});

		lineActions.currentStyle['opacity'] = animation;
		lineActions.currentStyle['lineHeight'] = interpolate(
			animation,
			[0, 1],
			[0, 1.53]
		);
		lineActions.currentStyle['fontSize'] = animation + 'em';
	}

	if (closest.type === 'unhighlight') {
		const animation = spring({
			fps,
			frame: frame - closest.from,
			config: {
				stiffness: 200,
				damping: 100,
				mass: 0.5,
				overshootClamping: true,
			},
			to: 0.3,
			from: lineActions.currentStyle.opacity ?? 1,
		});

		lineActions.currentStyle['opacity'] = animation;
	}

	if (closest.type === 'highlight') {
		const animation = spring({
			fps,
			frame: frame - closest.from,
			config: {
				stiffness: 200,
				damping: 100,
				mass: 0.5,
				overshootClamping: true,
			},
			to: 1,
			from: lineActions.currentStyle.opacity ?? 0.5,
		});

		lineActions.currentStyle['opacity'] = animation;
	}

	return lineActions.currentStyle;
};

const getGeneralStyle = ({
	generalActions,
	frame,
	fps,
}: {
	generalActions: GeneralActions;
	frame: number;
	fps: number;
}) => {
	if (!generalActions) return {};

	// Get closest action to the current frame
	const closest = generalActions.actions.reduce((a, b) => {
		return Math.abs(b.from - frame) < Math.abs(a.from - frame) ? b : a;
	});

	const xAnimation = spring({
		fps,
		frame: frame - closest.from,
		config: {
			stiffness: 200,
			damping: 100,
			mass: 0.5,
			overshootClamping: true,
		},
		to: 1,
		from: generalActions.currentStyle.left ?? undefined,
	});

	const yAnimation = spring({
		fps,
		frame: frame - closest.from,
		config: {
			stiffness: 200,
			damping: 100,
			mass: 0.5,
			overshootClamping: true,
		},
		to: 1,
		from: generalActions.currentStyle.top ?? undefined,
	});

	const zAnimation = spring({
		fps,
		frame: frame - closest.from,
		config: {
			stiffness: 200,
			damping: 100,
			mass: 0.5,
			overshootClamping: true,
		},
		to: 1,
		from: generalActions.currentStyle.zoom ?? 1,
	});

	generalActions.currentStyle['left'] = xAnimation;
	generalActions.currentStyle['top'] = yAnimation;
	generalActions.currentStyle['zoom'] = zAnimation;

	return generalActions.currentStyle;
};

interface LineActions {
	line: number;
	actions: LineAction[];
	currentStyle: {[key: string]: any};
}

interface LineAction {
	line: number;
	from: number;
	type: 'in' | 'out' | 'highlight' | 'unhighlight';
}

function instanceOfLineAction(object: any): object is LineAction {
	return 'line' in object && 'from' in object && 'type' in object;
}

interface GeneralActions {
	actions: GeneralAction[];
	currentStyle: {[key: string]: any};
}

function instanceOfGeneralAction(object: any): object is GeneralAction {
	return 'from' in object && ('x' in object || 'y' in object || 'z' in object);
}

interface GeneralAction {
	from: number;
	x?: number;
	y?: number;
	z?: number;
}

const CodeFrame: React.FC<{
	code: string;
	actions: (LineAction | GeneralAction)[];
	title: string;
	width: number;
}> = (props) => {
	const {code, actions, title, width} = props;
	const [lineActionsKeymap, setLineActionsKeymap] = useState<{
		[line: number]: LineActions;
	}>({});
	const [generalActions, setGeneralActions] = useState<GeneralActions>({
		actions: [],
		currentStyle: {},
	});

	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	useEffect(() => {
		const tempLineActions: {[frame: string]: LineActions} = {};
		const tempGeneralActions = generalActions;
		const linesOfCode = code.split(/\r\n|\r|\n/).length;

		// Cache inverted Actions
		// Inverted actions are actions that don't affect directly the action line
		// it affects the other lines
		// For instance highlight actions
		// in order to unhighligh the rest of the lines if specific lines got highlighted at specific frame
		// {highlight: {10: [1, 2, 3]}} | 'highlight' = Action Name; '10' = Frame; '[1, 2, 3]' = Lines affected by the action
		const invertedActions: {[key: string]: {[frame: number]: number[]}} = {};

		const addLineAction = (action: LineAction) => {
			// Generate LineStatus Object
			if (!tempLineActions[action.line]) {
				tempLineActions[action.line] = {
					line: action.line,
					actions: [],
					currentStyle: {},
				};
			}

			// Add Action
			tempLineActions[action.line].actions.push(action);
		};

		// Sort Actions
		for (const action of actions) {
			let add = true;

			// Add to Line Action
			if (instanceOfLineAction(action)) {
				// Add highlight action which happen at the same time in frame
				if (action.type === 'highlight') {
					if (!invertedActions['highlight']) {
						invertedActions['highlight'] = {};
					}

					if (invertedActions['highlight'][action.from]) {
						invertedActions['highlight'][action.from].push(action.line);
					} else invertedActions['highlight'][action.from] = [action.line];

					// Add action because if you want to highlight a current unhiglighted line you need this action
					add = true;
				}

				// Add unhighlight action which happen at the same time in frame
				if (action.type === 'unhighlight') {
					if (!invertedActions['unhighlight']) {
						invertedActions['unhighlight'] = {};
					}

					if (invertedActions['unhighlight'][action.from]) {
						invertedActions['unhighlight'][action.from].push(action.line);
					} else invertedActions['unhighlight'][action.from] = [action.line];

					// Don't add action because if you want to unhighlight a lne,
					// the actual line shouldn't be unhighlighted, instead the other lines should be highlighted
					add = false;
				}

				if (add) {
					addLineAction(action);
				}
			}

			// Add to General Action
			if (instanceOfGeneralAction(action)) {
				tempGeneralActions.actions.push(action);
			}
		}

		const generateInvertedActions = (
			keymap: {[key: number]: number[]},
			actionType: string
		) => {
			for (const key in keymap) {
				const action = keymap[key];

				for (let i = 0; i < linesOfCode; i++) {
					if (!action.includes(i)) {
						addLineAction({from: key as any, type: actionType as any, line: i});
					}
				}
			}
		};

		// Handle highlight Actions (-> unhighligh every other line except the highlighted lines)
		generateInvertedActions(invertedActions['highlight'], 'unhighlight');

		// Handle unhighlight Actions (-> highlight every other line except the unhighlighted lines)
		generateInvertedActions(invertedActions['unhighlight'], 'highlight');

		// Sort Actions based on Timing
		for (const key in tempLineActions) {
			tempLineActions[key].actions.sort((a, b) => {
				return a.from > b.from ? 1 : -1;
			});
		}
		tempGeneralActions.actions.sort((a, b) => {
			return a.from > b.from ? 1 : -1;
		});

		setLineActionsKeymap(tempLineActions);
		setGeneralActions(tempGeneralActions);
	}, []);

	return (
		<Container style={getGeneralStyle({generalActions, frame, fps})}>
			<Frame>
				<TitleContainer>
					<CircleContainer>
						<RedCircle />
						<YellowCircle />
						<GreenCircle />
					</CircleContainer>
					<Title>{title}</Title>
				</TitleContainer>
				<div>
					<Highlight
						{...defaultProps}
						theme={undefined}
						code={code}
						language="tsx"
					>
						{({className, style, tokens, getLineProps, getTokenProps}) => (
							<CodeContainer width={width} className={className} style={style}>
								{tokens.map((line, i) => {
									return (
										<Line
											key={i}
											{...getLineProps({line, key: i})}
											style={getLineStyle({
												lineActions: lineActionsKeymap[i],
												frame,
												fps,
											})}
										>
											<LineContent>
												{line.map((token, key) => {
													const props = getTokenProps({token, key});
													return (
														<span
															key={key}
															{...props}
															style={{
																fontSize:
																	props.children.trim() === '' ? 40 : '1em',
															}}
														/>
													);
												})}
											</LineContent>
										</Line>
									);
								})}
							</CodeContainer>
						)}
					</Highlight>
				</div>
			</Frame>
		</Container>
	);
};

export default CodeFrame;

const Container = styled.div`
	position: absolute;
	flex: 1;
	justify-content: center;
	align-items: center;
	display: flex;
`;

// pre = https://www.youtube.com/watch?v=9jZLg2CIgQQ
const CodeContainer = styled.pre<{
	width: number;
}>`
	text-align: left;
	margin: 0 100px 0 0 !important;
	font-size: 40px;
	width: ${(props) => props.width}px;
`;

const Line = styled.div`
	display: table-row;
`;

const LineContent = styled.span`
	display: table-cell;
`;

const Frame = styled.div`
	border: 3px solid var(--ifm-color-purple-lightest);
	border-radius: 20px;
	background-color: var(--ifm-color-black-light);
	overflow: hidden;

	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 20px 50px;
	font-size: 28px;

	background-color: var(--ifm-color-black-lighter);
`;

const Title = styled.div`
	font-size: 28px;
	color: var(--ifm-color-white-dark);
	margin-bottom: 5px;
`;

const CircleContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-right: 40px;
`;

const Circle = styled.div`
	height: 25px;
	width: 25px;
	border-radius: 50%;
	margin: 5px;
`;

const RedCircle = styled(Circle)`
	background-color: #ff605c;
`;

const GreenCircle = styled(Circle)`
	background-color: #ffbd44;
`;

const YellowCircle = styled(Circle)`
	background-color: #00ca4e;
`;
