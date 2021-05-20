import 'hack-font/build/web/hack.css';
import Highlight, {defaultProps, Language} from 'prism-react-renderer';
import React, {useEffect, useState} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import theme from './agileTheme';
import {
	extractGeneralActions,
	extractLineActions,
	GeneralAction,
	GeneralActions,
	getGeneralStyle,
	getLineStyle,
	LineAction,
	LineActions,
} from './controller';

export interface CodeFramePropsInterface {
	code: string;
	actions: (LineAction | GeneralAction)[];
	title: string;
	width: number;
	fontSize?: number;
	language?: Language;
}

const CodeFrame: React.FC<CodeFramePropsInterface> = (props) => {
	const {code, actions, title, width} = props;
	const fontSize = props.fontSize ?? 40;
	const language = props.language ?? 'jsx';
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
		const linesOfCode = code.split(/\r\n|\r|\n/).length;

		// TODO REMOVE
		console.log(extractLineActions(actions, linesOfCode));
		console.log(extractGeneralActions(actions));

		setLineActionsKeymap(extractLineActions(actions, linesOfCode));
		setGeneralActions(extractGeneralActions(actions));
	}, []);

	return (
		<Container>
			<Frame style={getGeneralStyle({generalActions, frame, fps})}>
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
						theme={theme}
						code={code.trim()}
						language={language}
					>
						{({className, style, tokens, getLineProps, getTokenProps}) => (
							<Pre
								width={width}
								fontSize={fontSize}
								className={className}
								style={style}
							>
								{tokens.map((line, i) => {
									const props = getLineProps({line, key: i});
									return (
										<Line
											key={i}
											{...props}
											className={props.className}
											style={{
												...props.style,
												...getLineStyle({
													lineActions: lineActionsKeymap[i],
													frame,
													fps,
												}),
											}}
										>
											<LineContent>
												{line.map((token, key) => {
													const props = getTokenProps({token, key});
													return (
														<span
															key={key}
															className={props.className}
															style={{
																...props.style,
																...{
																	fontSize:
																		props.children.trim() === ''
																			? fontSize
																			: '1em',
																},
															}}
														>
															{props.children}
														</span>
													);
												})}
											</LineContent>
										</Line>
									);
								})}
							</Pre>
						)}
					</Highlight>
				</div>
			</Frame>
		</Container>
	);
};

export default CodeFrame;

const Container = styled.div`
	position: relative;
	flex: 1;
	justify-content: center;
	align-items: center;
	display: flex;
`;

const Frame = styled.div`
	border: 3px solid var(--ifm-color-purple-lightest);
	border-radius: 20px;
	background-color: var(--ifm-color-black-light);
	overflow: hidden;

	box-shadow: 40px 60px 150px 0 var(--ifm-color-black-light);
	-moz-box-shadow: 40px 60px 150px 0 var(--ifm-color-black-light);
	-webkit-box-shadow: 40px 60px 150px 0 var(--ifm-color-black-light);

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
	font-size: 36px;
	color: var(--ifm-color-white-dark);
	margin-bottom: 6px;
`;

const CircleContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-right: 40px;
`;

const Circle = styled.div`
	height: 28px;
	width: 28px;
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

// pre = https://www.youtube.com/watch?v=9jZLg2CIgQQ
const Pre = styled.pre<{
	width: number;
	fontSize: number;
}>`
	text-align: left;
	margin: 0 !important;
	padding: 0.5em;
	font-size: ${(props) => props.fontSize}px;
	width: ${(props) => props.width}px;
`;

const Line = styled.div`
	display: table-row;
`;

const LineContent = styled.span`
	display: table-cell;
`;
