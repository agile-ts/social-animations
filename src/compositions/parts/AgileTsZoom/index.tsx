import {
	Img,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import styled from 'styled-components';
import logo from './AgileTsLogo.png';

const AgileTsZoom: React.FC = (props) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	// Spring Animation
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
			mass: 0.5,
		},
	});

	// Interpolate Animation to scale and y animation
	const imageScale = interpolate(progress, [0, 1], [140, 1]);
	const websiteUrlY = interpolate(progress, [0, 1], [13000, 20]);

	return (
		<Container>
			<Img
				src={logo}
				style={{transform: `scale(${imageScale})`}}
				width={200}
				height={200}
			/>
			<WebsiteUrl style={{transform: `translateY(${websiteUrlY}px)`}}>
				agile-ts.org
			</WebsiteUrl>
		</Container>
	);
};

export default AgileTsZoom;

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;

	align-items: center;
	justify-content: center;
	text-align: center;

	background-color: var(--ifm-color-white);
`;

const WebsiteUrl = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-size: 60px;
	font-weight: 700;
`;
