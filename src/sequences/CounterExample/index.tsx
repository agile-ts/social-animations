import {Sequence, useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import Black from '../../components/colors/Black';
import Core from '../../compositions/final/CounterExample/Core';
import MyComponent from '../../compositions/final/CounterExample/MyComponent';
import AgileTsZoom from '../../compositions/parts/AgileTsZoom';
import HowTo from '../../compositions/parts/HowTo';
import Showcase from '../../compositions/parts/Showcase';
import Transition from '../../transitions/Transition';
import video from './showcase.mp4';

export const fps = 30;

const CounterExample: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<Container purple={frame > 10 * fps}>
			<div>
				<Sequence from={0} durationInFrames={3 * fps}>
					<Transition pointInTime={'out'} type={'slideUp'}>
						<HowTo
							text={
								"How to create a <br /> <div style='color: var(--ifm-color-purple-dark); display: inline-block'>Counter</div> in AgileTs?"
							}
						/>
					</Transition>
				</Sequence>
				<Sequence from={3 * fps} durationInFrames={5 * fps}>
					<Transition pointInTime={'in'} type={'slideUp'}>
						<Showcase
							video={video}
							text={'Preview of application we will build.'}
						/>
					</Transition>
				</Sequence>
				<Sequence from={8 * fps - 10} durationInFrames={50}>
					<Transition pointInTime="in" type={'slideRight'}>
						<Black />
					</Transition>
				</Sequence>
				<Sequence from={8 * fps} durationInFrames={10 * fps}>
					<Transition pointInTime="in" type={'slideRight'}>
						<Transition pointInTime="out" type={'slideRight'}>
							<Core />
						</Transition>
					</Transition>
				</Sequence>
				<Sequence from={18 * fps - 10} durationInFrames={20 * fps}>
					<Transition pointInTime="in" type={'slideRight'}>
						<MyComponent />
					</Transition>
				</Sequence>
				<Sequence from={38 * fps - 15} durationInFrames={10 * fps}>
					<AgileTsZoom />
				</Sequence>
			</div>
		</Container>
	);
};

export default CounterExample;

const Container = styled.div<{purple: boolean}>`
	flex: 1;
	background-color: ${(props) =>
		props.purple ? 'var(--ifm-color-purple)' : 'var(--ifm-color-white)'};
`;
