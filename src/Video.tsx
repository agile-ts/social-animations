import {Composition} from 'remotion';
import Test from './compositions/code/Test';
import Test2 from './compositions/code/Test2';
import {Sequence1} from './sequences/Sequence1';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id={'Test'}
				component={Test}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={500}
			/>
			<Composition
				id={'Test2'}
				component={Test2}
				width={1920}
				height={1080}
				fps={15}
				durationInFrames={500}
			/>
			<Composition
				id={'Sequence1'}
				component={Sequence1}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={800}
			/>
		</>
	);
};
