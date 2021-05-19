import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';

export interface HowToPropsInterface {
	text: string;
}

const HowTo: React.FC<HowToPropsInterface> = (props) => {
	const {text} = props;

	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	// Slide In Animation
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	const translateY = interpolate(progress, [0, 1], [600, 0]);

	return (
		<Container>
			<div
				style={{
					transform: `translateY(${translateY}px)`,
				}}
				//eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{__html: text}}
			/>
		</Container>
	);
};

export default HowTo;

const Container = styled.div`
	display: flex;
	flex: 1;

	align-items: center;
	justify-content: center;
	text-align: center;

	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 120px;
	font-weight: 700;

	background-color: var(--ifm-color-white);
`;
