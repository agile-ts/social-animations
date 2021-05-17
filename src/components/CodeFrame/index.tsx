import 'hack-font/build/web/hack.css';
import Highlight, {defaultProps} from 'prism-react-renderer';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import './prism.css';

const getProgressOfLine = ({
	line,
	frame,
	fps,
	timing,
}: {
	line: number;
	frame: number;
	fps: number;
	timing: Timing[];
}) => {
	const segment = timing.find((t) => t.line === line);
	if (!segment) {
		return 1;
	}
	return spring({
		fps,
		frame: frame - segment.from,
		config: {
			stiffness: 200,
			damping: 100,
			mass: 0.5,
			overshootClamping: true,
		},
	});
};

type Timing = {
	line: number;
	from: number;
};

const CodeFrame: React.FC<{
	code: string;
	timing: Timing[];
	title: string;
	width: number;
}> = (props) => {
	const {code, timing, title, width} = props;

	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<Container>
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
											style={{
												opacity: getProgressOfLine({
													line: i,
													frame,
													fps,
													timing,
												}),
												lineHeight: interpolate(
													getProgressOfLine({
														line: i,
														frame,
														fps,
														timing,
													}),
													[0, 1],
													[0, 1.53]
												),
												fontSize:
													getProgressOfLine({
														line: i,
														frame,
														fps,
														timing,
													}) + 'em',
											}}
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
	margin: 0 !important;
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
	background-color: var(--ifm-color-black-lighter);
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
