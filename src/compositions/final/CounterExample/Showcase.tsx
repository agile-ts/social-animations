import {AbsoluteFill, useCurrentFrame, useVideoConfig, Video} from 'remotion';
import styled from 'styled-components';
import video from './showcase.mp4';

const Showcase: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames, height, width} = useVideoConfig();

	return (
		<Container>
			<StyledVideo width={width} height={height} src={video} />
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

const StyledVideo = styled(Video)<{width: number; height: number}>`
	width: ${(props) => props.width / 1.5}px;
	height: ${(props) => props.height / 1.5}px;
`;
