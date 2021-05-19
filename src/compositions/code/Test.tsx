import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../components/CodeFrame';

const code = `// 1. Create Agile Instance
export const App = new Agile();

// 2. Create State
export const MY_STATE = App.createState('jeff');`;

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
		to: 0.6,
	});

	return (
		<Container>
			<CodeContainer style={{transform: `scale(${scale * (1 - scaleOut)})`}}>
				<CodeFrame
					code={code}
					width={1500}
					title="core.ts"
					actions={[
						{line: 3, from: 100, type: 'in'},
						{line: 4, from: 100, type: 'in'},
						{line: 3, from: 110, type: 'highlight'},
						{line: 4, from: 110, type: 'highlight'},

						{line: 3, from: 250, type: 'unhighlight'},
						{line: 4, from: 250, type: 'unhighlight'},
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
