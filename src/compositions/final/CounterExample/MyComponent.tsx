import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../../components/CodeFrame';

const code = `
const MyComponent = () => {
  // 3️⃣ Bind Counter State to 'MyComponent' for reactivity
  const counter = useAgile(COUNTER);

  return (
    <div>
      {/* Use returned 'counter' value */}
      <p>{counter}</p>
      {/* 4️⃣ Update State value on button press */}
      <button
        onClick={() => {
          COUNTER.set((c) => c + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
`;

const MyComponent: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Scale In Animation
	const scale = spring({
		frame,
		fps,
		config: {
			damping: 200,
		},
	});

	// Scale Out Animation
	const scaleOut = spring({
		frame: frame - durationInFrames + 20,
		fps,
		config: {
			damping: 100,
		},
		from: 0,
		to: 1,
	});

	return (
		<Container>
			<CodeContainer style={{transform: `scale(${scale * (1 - scaleOut)})`}}>
				<CodeFrame
					code={code}
					width={1500}
					title="MyComponent.tsx"
					actions={[
						{from: 1 * fps, line: [1, 2], type: 'in'},

						{from: 1 * fps + 15, line: [1, 2], type: 'highlight'},

						{from: 5 * fps, line: [6, 7], type: 'in'},
						{from: 5 * fps + 15, line: [6, 7], type: 'highlight'},
						{from: 10 * fps, line: 6, type: 'out'},

						{from: 10 * fps, line: [8, 9, 10, 11, 12, 13, 14, 15], type: 'in'},
						{
							from: 10 * fps + 15,
							line: [8, 9, 10, 11, 12, 13, 14, 15],
							type: 'highlight',
						},
						{from: 13 * fps, line: [8, 11], type: 'highlight'},
						{from: 17 * fps, line: [8, 11], type: 'unhighlight'},

						{from: 17 * fps, z: -100},
					]}
				/>
			</CodeContainer>
		</Container>
	);
};

export default MyComponent;

const CodeContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const Container = styled(AbsoluteFill)`
	background-color: rgba(0, 0, 0, 0);
`;
