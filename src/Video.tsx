import {Composition} from 'remotion';
import HowToCreateCollectionSequence, {
	fps as howToCreateCollectionSequenceFps,
} from './sequences/HowToCreateCollectionSequence';
import HowToCreateStateSequence, {
	fps as howToCreateStateSequenceFps,
} from './sequences/HowToCreateStateSequence';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id={'HowToCreateStateSequence'}
				component={HowToCreateStateSequence}
				width={1920}
				height={1080}
				fps={howToCreateStateSequenceFps}
				durationInFrames={40 * howToCreateStateSequenceFps}
			/>
			<Composition
				id={'HowToCreateCollectionSequence'}
				component={HowToCreateCollectionSequence}
				width={1920}
				height={1080}
				fps={howToCreateCollectionSequenceFps}
				durationInFrames={60 * howToCreateCollectionSequenceFps}
			/>
		</>
	);
};
