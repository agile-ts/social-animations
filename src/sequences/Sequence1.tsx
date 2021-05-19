import {Sequence} from 'remotion';
import styled from 'styled-components';
import Black from '../components/colors/Black';
import Test from '../compositions/code/Test';
import Test2 from '../compositions/code/Test2';
import HowTo from '../compositions/HowTo';
import Transition from '../transitions/Transition';

export const sequence1Fps = 30;

export const Sequence1: React.FC = () => {
	return (
		<Container>
			<div>
				<Sequence from={0} durationInFrames={3 * sequence1Fps}>
					<HowTo text={'How to create a <br /> State in AgileTs?'} />
				</Sequence>
				<Sequence from={3 * sequence1Fps - 20} durationInFrames={100}>
					<Transition type="in">
						<Black />
					</Transition>
				</Sequence>
				<Sequence from={3 * sequence1Fps} durationInFrames={5 * sequence1Fps}>
					<Transition type="in">
						<Transition type="out">
							<Test />
						</Transition>
					</Transition>
				</Sequence>
				<Sequence
					from={8 * sequence1Fps - 10}
					durationInFrames={20 * sequence1Fps}
				>
					<Transition type="in">
						<Test2 />
					</Transition>
				</Sequence>
			</div>
		</Container>
	);
};

const Container = styled.div`
	flex: 1;
	background-color: var(--ifm-color-purple);
`;
