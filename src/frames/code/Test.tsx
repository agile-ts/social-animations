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

const Test: React.FC = () => {
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
					width={1400}
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
					]}
				/>
			</CodeContainer>
		</Container>
	);
};

export default Test;

const CodeContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const Container = styled(AbsoluteFill)`
	background-color: var(--ifm-color-purple);
`;
