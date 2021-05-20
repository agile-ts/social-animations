import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import CodeFrame from '../../../components/CodeFrame';

const code = `const MyComponent = () => {
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
					fontSize={25}
					actions={[
						{from: 0, z: 1},

						{from: 50, z: 50, x: 200},
						// TODO
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
