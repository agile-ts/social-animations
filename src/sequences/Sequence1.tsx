import {Sequence, useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import Black from '../components/colors/Black';
import AgileTsZoom from '../compositions/AgileTsZoom';
import Test from '../compositions/code/Test';
import Test2 from '../compositions/code/Test2';
import HowTo from '../compositions/HowTo';
import Transition from '../transitions/Transition';

export const sequence1Fps = 30;

export const Sequence1: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<Container purple={frame > 6 * sequence1Fps}>
			<div>
				<Sequence from={0} durationInFrames={3 * sequence1Fps}>
					<HowTo text={'How to create a <br /> State in AgileTs?'} />
				</Sequence>
				<Sequence from={3 * sequence1Fps - 10} durationInFrames={100}>
					<Transition type="in">
						<Black />
					</Transition>
				</Sequence>
				<Sequence from={3 * sequence1Fps} durationInFrames={10 * sequence1Fps}>
					<Transition type="in">
						<Transition type="out">
							<Test />
						</Transition>
					</Transition>
				</Sequence>
				<Sequence
					from={13 * sequence1Fps - 10}
					durationInFrames={20 * sequence1Fps}
				>
					<Transition type="in">
						<Test2 />
					</Transition>
				</Sequence>
				<Sequence
					from={33 * sequence1Fps - 15}
					durationInFrames={10 * sequence1Fps}
				>
					<AgileTsZoom />
				</Sequence>
			</div>
		</Container>
	);
};

const Container = styled.div<{purple: boolean}>`
	flex: 1;
	background-color: ${(props) =>
		props.purple ? 'var(--ifm-color-purple)' : 'var(--ifm-color-white)'};
`;
