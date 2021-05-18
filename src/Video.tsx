import {Composition} from 'remotion';
import {Composition1} from './compositions/Composition1';
import Test from './frames/code/Test';
import Test2 from './frames/code/Test2';

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
				fps={30}
				durationInFrames={500}
			/>
			<Composition
				id={'Composition1'}
				component={Composition1}
				width={1920}
				height={1080}
				fps={30}
				durationInFrames={800}
			/>
		</>
	);
};
