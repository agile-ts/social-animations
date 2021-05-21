import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../../components/CodeFrame';

const code = `
const MyComponent = () => {
    // 3️⃣ Bind Collection to 'MyComponent' for reactivity
    const todos = useAgile(TODOS);

    // Current Input of Name Form
    const [currentInput, setCurrentInput] = React.useState("");

    return (
        <div>
            <h3>Simple TODOS</h3>
            <input 
            type="text" 
            name="name" 
            value={currentInput} 
            onChange={(event) => {
                setCurrentInput(event.target.value);
            }}/>
            <button onClick={() => {
              if(currentInput === '') return;
                
              // 4️⃣ Add new Todo to Collection based on current input
              TODOS.collect({id: generateId(), name: currentInput});
              setCurrentInput('');
            }}>
                Add
            </button>
            {
                // Display Todos by mapping through the 'todos' array
                todos.map((value) =>
                    <div key={value.id} style={{marginBottom: 10}}>
                        <div>{value.name}</div>
                        <button style={{margin: 0}}  onClick={() => {
                         // 5️⃣ Remove Todo from Collection on button press
                         TODOS.remove(value.id).everywhere();
                        }}>
                           Remove
                        </button>
                    </div>
                )
            }
        </div>
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
					width={1300}
					title="MyComponent.tsx"
					fontSize={30}
					actions={[
						{from: 0, z: -200},

						{from: 0.5 * fps, z: 50, x: 0, y: 0},

						// Step 3
						{from: 1 * fps + 10, line: [1, 2], type: 'in'},
						{from: 1 * fps + 25, line: [1, 2], type: 'highlight'},

						// Move
						{from: 5 * fps, z: 50, x: 0, y: -100},

						// Step 3.1
						{
							from: 5 * fps + 10,
							line: [26, 27, 28, 29, 30, 37, 38, 39],
							type: 'in',
						},
						{
							from: 5 * fps + 25,
							line: [26, 27, 28, 29, 30, 37, 38, 39],
							type: 'highlight',
						},
						{from: 8 * fps, line: [27, 28, 38], type: 'highlight'},
						{from: 12 * fps, line: 27, type: 'out'},

						// Move
						{from: 12 * fps, z: 50, x: 0, y: -20},

						// Step 4
						{
							from: 12 * fps + 10,
							line: [
								10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
							],
							type: 'in',
						},
						{
							from: 12 * fps + 25,
							line: [
								10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
							],
							type: 'highlight',
						},
						{from: 20 * fps, line: [20, 21], type: 'highlight'},

						// Move
						{from: 24 * fps, z: 50, x: 0, y: -550},

						// Step 5
						{from: 24 * fps + 10, line: [31, 32, 33, 34, 35, 36], type: 'in'},
						{
							from: 24 * fps + 25,
							line: [31, 32, 33, 34, 35, 36],
							type: 'highlight',
						},
						{from: 30 * fps, line: [32, 33], type: 'highlight'},
						{from: 34 * fps, line: [32, 33], type: 'unhighlight'},

						// Move
						{from: 34 * fps, z: -200, x: 0, y: 0},
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
