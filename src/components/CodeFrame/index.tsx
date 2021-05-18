import 'hack-font/build/web/hack.css';
import Highlight, {defaultProps} from 'prism-react-renderer';
import React, {useEffect, useState} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import './prism.css';

const getLineStyle = ({
	lineStatus,
	frame,
	fps,
}: {
	lineStatus: LineStatus;
	frame: number;
	fps: number;
}) => {
	if (!lineStatus) return {};

	// console.log(lineStatus);

	// Get closes action to the current frame
	const closest = lineStatus.actions.reduce((a, b) => {
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
			from: lineStatus.currentStyle.opacity ?? 1,
		});

		lineStatus.currentStyle['opacity'] = animation;
		lineStatus.currentStyle['lineHeight'] = interpolate(
			animation,
			[0, 1],
			[0, 1.53]
		);
		lineStatus.currentStyle['fontSize'] = animation + 'em';
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
			from: lineStatus.currentStyle.opacity ?? 0,
		});

		lineStatus.currentStyle['opacity'] = animation;
		lineStatus.currentStyle['lineHeight'] = interpolate(
			animation,
			[0, 1],
			[0, 1.53]
		);
		lineStatus.currentStyle['fontSize'] = animation + 'em';
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
			from: lineStatus.currentStyle.opacity ?? 1,
		});

		lineStatus.currentStyle['opacity'] = animation;
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
			from: lineStatus.currentStyle.opacity ?? 0.5,
		});

		lineStatus.currentStyle['opacity'] = animation;
	}

	return lineStatus.currentStyle;
};

interface LineAction {
	line: number;
	from: number;
	type?: 'in' | 'out' | 'highlight' | 'unhighlight';
}

interface LineStatus {
	line: number;
	actions: LineAction[];
	currentStyle: {[key: string]: any};
}

const CodeFrame: React.FC<{
	code: string;
	actions: LineAction[];
	title: string;
	width: number;
}> = (props) => {
	const {code, actions, title, width} = props;
	const [lineStatuses, setLineStatuses] = useState<{[key: number]: LineStatus}>(
		{}
	);

	useEffect(() => {
		const tempLineStatuses: {[key: number]: LineStatus} = {};

		for (const action of actions) {
			// Generate LineStatus Object
			if (!tempLineStatuses[action.line]) {
				tempLineStatuses[action.line] = {
					line: action.line,
					actions: [],
					currentStyle: {},
				};
			}

			// Add Action
			tempLineStatuses[action.line].actions.push(action);
		}

		// Sort Actions based on Timing
		for (const key in tempLineStatuses) {
			tempLineStatuses[key].actions.sort((a, b) => {
				return a.from > b.from ? 1 : -1;
			});
		}

		setLineStatuses(tempLineStatuses);
	}, []);

	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<Container zoom={1}>
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
												lineStatus: lineStatuses[i],
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

const Container = styled.div<{
	zoom: number;
}>`
	flex: 1;
	justify-content: center;
	align-items: center;
	display: flex;
	zoom: ${(props) => props.zoom};
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
