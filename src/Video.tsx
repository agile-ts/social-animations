import {Composition} from 'remotion';
import Test from './frames/code/Test';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Test"
				component={Test}
				durationInFrames={400}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
