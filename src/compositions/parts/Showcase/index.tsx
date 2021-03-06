import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Video,
} from 'remotion';
import styled from 'styled-components';
import chromeHeader from './chromeHeader.svg';

export interface ShowcasePropsInterface {
	video: any;
	height?: number;
	width?: number;
	videoWidth?: number;
	text?: string;
}

const Showcase: React.FC<ShowcasePropsInterface> = (props) => {
	const {video, text} = props;
	const chromeHeight = props.height ?? 600;
	const chromeWidth = props.width ?? 1500;
	const videoWidth = props.videoWidth ?? 800;

	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Spring Animation
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
			mass: 0.5,
		},
	});
	const textY = interpolate(progress, [0, 1], [13000, 40]);

	return (
		<Container>
			<ChromeContainer width={chromeWidth} height={chromeHeight}>
				<ChromeHeader src={chromeHeader} />
				<StyledVideo width={videoWidth} src={video} />
			</ChromeContainer>
			{text && (
				<Text style={{transform: `translateY(${textY}px)`}}>{text}</Text>
			)}
		</Container>
	);
};

export default Showcase;

const Container = styled(AbsoluteFill)`
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: var(--ifm-color-white);
`;

const ChromeContainer = styled.div<{
	width: number | null;
	height: number | null;
}>`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow: hidden;

	height: ${(props) => props.height}px;
	width: ${(props) => props.width}px;

	border: var(--ifm-color-purple-lightest) solid 3px;
	border-radius: 17px;

	background-color: var(--ifm-color-white);
`;

const ChromeHeader = styled(Img)`
	margin-top: -5px; // To make ChromeContainer Border more fitting
	width: 100%;

	z-index: 1;
`;

const StyledVideo = styled(Video)`
	margin-top: -5px; // To avoid 1px white line which occurs during animation
`;

const Text = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 50px;
	font-weight: 700;
`;
