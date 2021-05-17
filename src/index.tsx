import {registerRoot} from 'remotion';
import {RemotionVideo} from './Video';
import './css/global.css';

const App = () => {
	return(
		<>
			<RemotionVideo/>
		</>
	)
}

registerRoot(App);
