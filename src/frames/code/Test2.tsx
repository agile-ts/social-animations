import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../components/CodeFrame';

const code = `const MyComponent = () => {
	// 3. Bind State to Component for reactivity
   const myState = useAgile(MY_STATE); // Returns 'jeff'

   return (
   	{/* Use State in Component */}
     <p>{myState}</p>
     {/* 4. Update State on Button press */}
     <button onClick={() => {
     	  MY_STATE.set('frank');
     }}>Change State</button>
   );
}`;

const Test2: React.FC = () => {
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
		frame: frame - durationInFrames + 13,
		fps,
		config: {
			mass: 0.4,
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

						{line: 7, from: 300, type: 'in'},
						{line: 8, from: 300, type: 'in'},
						{line: 9, from: 300, type: 'in'},
						{line: 10, from: 300, type: 'in'},

						{line: 7, from: 310, type: 'highlight'},
						{line: 8, from: 310, type: 'highlight'},
						{line: 9, from: 310, type: 'highlight'},
						{line: 10, from: 310, type: 'highlight'},

						{line: 7, from: 400, type: 'unhighlight'},
						{line: 8, from: 400, type: 'unhighlight'},
						{line: 9, from: 400, type: 'unhighlight'},
						{line: 10, from: 400, type: 'unhighlight'},
					]}
				/>
			</CodeContainer>
		</Container>
	);
};

export default Test2;

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
