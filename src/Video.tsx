import {Composition} from 'remotion';
import CounterExample, {
	fps as counterExampleFps,
} from './sequences/CounterExample';
import TodoListExample, {
	fps as todoListExampleFps,
} from './sequences/TodoListExample';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id={'CounterExample'}
				component={CounterExample}
				width={1920}
				height={1080}
				fps={counterExampleFps}
				durationInFrames={40 * counterExampleFps}
			/>
			<Composition
				id={'TodoListExample'}
				component={TodoListExample}
				width={1920}
				height={1080}
				fps={todoListExampleFps}
				durationInFrames={65 * todoListExampleFps}
			/>
		</>
	);
};
