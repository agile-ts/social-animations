import {Sequence} from 'remotion';
import styled from 'styled-components';
import Test from '../frames/code/Test';
import Test2 from '../frames/code/Test2';
import Transition from '../transitions/Transition';

export const Composition1: React.FC = () => {
	return (
		<Container>
			<div>
				<Sequence from={0} durationInFrames={135}>
					<Transition type="out">
						<Test />
					</Transition>
				</Sequence>
				<Sequence from={120} durationInFrames={120}>
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
