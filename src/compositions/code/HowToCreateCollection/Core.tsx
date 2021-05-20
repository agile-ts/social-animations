import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../../components/CodeFrame';

const code = `// 1️⃣ Create Instance of AgileTs
const App = new Agile();

// 2️⃣ Create Collection
const TODOS = App.createCollection({
  initialData: [{id: 1, name: "Clean Bathroom"}]
});
`;

const Core: React.FC = () => {
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
					fontSize={40}
					actions={[
						{line: 3, from: 100, type: 'in'},
						{line: 4, from: 100, type: 'in'},
						{line: 5, from: 100, type: 'in'},
						{line: 6, from: 100, type: 'in'},
						{line: 3, from: 110, type: 'highlight'},
						{line: 4, from: 110, type: 'highlight'},
						{line: 5, from: 110, type: 'highlight'},
						{line: 6, from: 110, type: 'highlight'},

						{line: 3, from: 200, type: 'unhighlight'},
						{line: 4, from: 200, type: 'unhighlight'},
						{line: 5, from: 200, type: 'unhighlight'},
						{line: 6, from: 200, type: 'unhighlight'},
					]}
				/>
			</CodeContainer>
		</Container>
	);
};

export default Core;

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
