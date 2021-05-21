import {Sequence, useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import Black from '../components/colors/Black';
import AgileTsZoom from '../compositions/AgileTsZoom';
import Core from '../compositions/code/HowToCreateCollection/Core';
import MyComponent from '../compositions/code/HowToCreateCollection/MyComponent';
import HowTo from '../compositions/HowTo';
import Transition from '../transitions/Transition';

export const fps = 30;

const HowToCreateCollectionSequence: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<Container purple={frame > 6 * fps}>
			<div>
				<Sequence from={0} durationInFrames={3 * fps}>
					<HowTo text={'How to create a <br /> Collection in AgileTs?'} />
				</Sequence>
				<Sequence from={3 * fps - 5} durationInFrames={100}>
					<Transition type="in">
						<Black />
					</Transition>
				</Sequence>
				<Sequence from={3 * fps} durationInFrames={10 * fps}>
					<Transition type="in">
						<Transition type="out">
							<Core />
						</Transition>
					</Transition>
				</Sequence>
				<Sequence from={13 * fps - 10} durationInFrames={40 * fps}>
					<Transition type="in">
						<MyComponent />
					</Transition>
				</Sequence>
				<Sequence from={53 * fps - 15} durationInFrames={10 * fps}>
					<AgileTsZoom />
				</Sequence>
			</div>
		</Container>
	);
};

export default HowToCreateCollectionSequence;

const Container = styled.div<{purple: boolean}>`
	flex: 1;
	background-color: ${(props) =>
		props.purple ? 'var(--ifm-color-purple)' : 'var(--ifm-color-white)'};
`;
