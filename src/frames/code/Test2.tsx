import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../components/CodeFrame';

const code = `// 1. Create Agile Instance
const App = new Agile();

// 2. Create State
const MY_STATE = App.createState('jeff');

const MyComponent = () => {
	 // 3. Bind State to Component for reactivity
   const myState = useAgile(MY_STATE); // Returns 'jeff'

   return (
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
						{line: 0, from: 5, type: 'in'},
						{line: 1, from: 20, type: 'in'},

						{line: 3, from: 50, type: 'in'},
						{line: 4, from: 50, type: 'in'},

						{line: 7, from: 100, type: 'in'},
						{line: 8, from: 100, type: 'in'},
						{line: 9, from: 100, type: 'in'},
						{line: 11, from: 100, type: 'in'},

						{line: 12, from: 200, type: 'in'},
						{line: 13, from: 200, type: 'in'},
						{line: 14, from: 200, type: 'in'},
						{line: 15, from: 200, type: 'in'},

						{from: 200, z: 0.8},
						{from: 250, z: 1.5, x: (460 * 1.5) / 6.5, y: -250},

						{line: 12, from: 250, type: 'highlight'},
						{line: 13, from: 250, type: 'highlight'},
						{line: 14, from: 250, type: 'highlight'},
						{line: 15, from: 250, type: 'highlight'},

						{line: 1, from: 300, type: 'highlight'},
						{from: 300, x: 0, z: 0.8, y: 0},

						{line: 1, from: 350, type: 'unhighlight'},
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
