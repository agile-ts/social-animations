import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../../components/CodeFrame';

const code = `
const MyComponent = () => {
   // 3️⃣ Bind State to 'MyComponent' for reactivity
   const myState = useAgile(MY_STATE); // Returns 'jeff'

   return (
     {/* Use returned 'myState' value */}
     <p>{myState}</p>
     {/* 4️⃣ Update State value on Button press */}
     <button onClick={() => {
     	  MY_STATE.set('frank');
     }}>Change State</button>
   );
}
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

						{from: 5 * fps, line: [5, 6], type: 'in'},
						{from: 5 * fps + 15, line: [5, 6], type: 'highlight'},
						{from: 10 * fps, line: 5, type: 'out'},

						{from: 10 * fps, line: [7, 8, 9, 10], type: 'in'},
						{from: 10 * fps + 15, line: [7, 8, 9, 10], type: 'highlight'},
						{from: 12 * fps, line: [7, 9], type: 'highlight'},
						{from: 17 * fps, line: [7, 9], type: 'unhighlight'},
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
