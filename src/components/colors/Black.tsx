import {AbsoluteFill} from 'remotion';
import styled from 'styled-components';

const Black: React.FC = () => {
	return <Container />;
};

export default Black;

const Container = styled(AbsoluteFill)`
	background: linear-gradient(
		to right,
		var(--ifm-color-black-light),
		var(--ifm-color-black)
	);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
`;
