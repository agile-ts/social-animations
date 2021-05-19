import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../../components/CodeFrame';

const code = `const MyComponent = () => {
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
}`;

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
						{line: 1, from: 50, type: 'in'},
						{line: 2, from: 50, type: 'in'},
						{line: 6, from: 50, type: 'in'},

						{line: 1, from: 60, type: 'highlight'},
						{line: 2, from: 60, type: 'highlight'},

						{line: 5, from: 150, type: 'in'},
						{line: 6, from: 150, type: 'highlight'},
						{line: 5, from: 250, type: 'out'},

						{line: 7, from: 250, type: 'in'},
						{line: 8, from: 250, type: 'in'},
						{line: 9, from: 250, type: 'in'},
						{line: 10, from: 250, type: 'in'},

						{line: 7, from: 260, type: 'highlight'},
						// {line: 8, from: 310, type: 'highlight'},
						{line: 9, from: 260, type: 'highlight'},
						// {line: 10, from: 310, type: 'highlight'},

						{line: 7, from: 420, type: 'unhighlight'},
						// {line: 8, from: 400, type: 'unhighlight'},
						{line: 9, from: 420, type: 'unhighlight'},
						// {line: 10, from: 400, type: 'unhighlight'},
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
