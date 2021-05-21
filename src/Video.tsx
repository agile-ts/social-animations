import {Composition} from 'remotion';
import HowToUseCollectionSequence, {
	fps as howToUseCollectionSequenceFps,
} from './sequences/HowToUseCollectionSequence';
import HowToUseAStateSequence, {
	fps as howToUseStateSequenceFps,
} from './sequences/HowToUseStateSequence';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id={'HowToUseStateSequence'}
				component={HowToUseAStateSequence}
				width={1920}
				height={1080}
				fps={howToUseStateSequenceFps}
				durationInFrames={40 * howToUseStateSequenceFps}
			/>
			<Composition
				id={'HowToUseCollectionSequence'}
				component={HowToUseCollectionSequence}
				width={1920}
				height={1080}
				fps={howToUseCollectionSequenceFps}
				durationInFrames={60 * howToUseCollectionSequenceFps}
			/>
		</>
	);
};
