import {Sequence, useCurrentFrame} from 'remotion';
import styled from 'styled-components';
import Black from '../components/colors/Black';
import Core from '../compositions/final/TodoListExample/Core';
import MyComponent from '../compositions/final/TodoListExample/MyComponent';
import AgileTsZoom from '../compositions/parts/AgileTsZoom';
import HowTo from '../compositions/parts/HowTo';
import Transition from '../transitions/Transition';

export const fps = 30;

const TodoListExample: React.FC = () => {
	const frame = useCurrentFrame();

	return (
		<Container purple={frame > 6 * fps}>
			<div>
				<Sequence from={0} durationInFrames={3 * fps}>
					<HowTo text={'How to create a <br /> Todo List in AgileTs?'} />
				</Sequence>
				<Sequence from={3 * fps - 10} durationInFrames={50}>
					<Transition pointInTime="in" type={'slideRight'}>
						<Black />
					</Transition>
				</Sequence>
				<Sequence from={3 * fps} durationInFrames={10 * fps}>
					<Transition pointInTime="in" type={'slideRight'}>
						<Transition pointInTime="out" type={'slideRight'}>
							<Core />
						</Transition>
					</Transition>
				</Sequence>
				<Sequence from={13 * fps - 10} durationInFrames={40 * fps}>
					<Transition pointInTime="in" type={'slideRight'}>
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

export default TodoListExample;

const Container = styled.div<{purple: boolean}>`
	flex: 1;
	background-color: ${(props) =>
		props.purple ? 'var(--ifm-color-purple)' : 'var(--ifm-color-white)'};
`;
