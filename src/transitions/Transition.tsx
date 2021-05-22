import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export interface TransitionProps {
	pointInTime: 'in' | 'out';
	type: 'slideRight' | 'slideUp';
}

const Transition: React.FC<TransitionProps> = (props) => {
	const {children, type, pointInTime} = props;

	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();
	let style = {};

	const firstFrame = videoConfig.durationInFrames - 9;
	const progress = spring({
		config: {
			damping: 80,
		},
		fps: videoConfig.fps,
		frame: pointInTime === 'in' ? frame : Math.max(0, frame - firstFrame),
	});

	// Interpolation to map progress to percentage values
	const percent = interpolate(
		progress,
		[0, 1],
		pointInTime === 'in' ? [100, 0] : [0, 100]
	);

	// Set Style for 'slideRight' Animation
	if (type === 'slideRight') {
		style = {
			transform: `translateX(${pointInTime === 'in' ? percent : 0 - percent}%)`,
		};
	}

	// Set Style for 'slideRight' Animation
	if (type === 'slideUp') {
		style = {
			transform: `translateY(${pointInTime === 'in' ? percent : 0 - percent}%)`,
		};
	}

	return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export default Transition;
