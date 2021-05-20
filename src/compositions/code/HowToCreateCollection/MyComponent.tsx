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
                // Displays
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
					width={1500}
					title="MyComponent.tsx"
					fontSize={30}
					actions={[
						{from: 0, z: -200},

						{from: 50, z: 50, x: 25, y: 300},

						// Step 3
						{line: [1, 2], from: 60, type: 'in'},
						{line: [1, 2], from: 70, type: 'highlight'},

						{from: 200, z: 50, x: 25, y: -400},

						// Step 3.1
						{line: 27, from: 190, type: 'in'},
						{line: 27, from: 200, type: 'highlight'},
						{line: 28, from: 200, type: 'highlight'},
						{line: 38, from: 200, type: 'highlight'},
						{line: 27, from: 300, type: 'out'},

						{from: 200, z: 50, x: 25, y: -200},

						// Step 4
						{
							line: [
								10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
							],
							from: 310,
							type: 'in',
						},
						{line: 20, from: 320, type: 'highlight'},
						{line: 21, from: 320, type: 'highlight'},

						{from: 430, z: 50, x: 25, y: -500},

						// Step 5
						{line: [31, 32, 33, 34, 35, 36], from: 450, type: 'in'},
						{line: 32, from: 460, type: 'highlight'},
						{line: 33, from: 460, type: 'highlight'},
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
