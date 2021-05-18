import {interpolate, spring} from 'remotion';

export const extractLineActions = (
	actions: (LineAction | GeneralAction)[],
	linesOfCode: number
): {[frame: string]: LineActions} => {
	const tempLineActions: {[frame: string]: LineActions} = {};

	// Cache inverted Actions
	// Inverted actions are actions that don't affect directly the line it is performed on
	// instead they affects the other lines (excluded the line it is performed on)
	// For instance this is the case in a 'highlight' action:
	// Because if we highlight a line we actual unhighlight the not highlighted lines
	// to do so we need to keep track of the lines that got highlighted in order to unhighlight the rest
	// {highlight: {10: [1, 2, 3]}} -> 'highlight' = Action Name; '10' = Frame; '[1, 2, 3]' = Lines affected by the action
	const invertedActions: {[key: string]: {[frame: number]: number[]}} = {};

	const addLineAction = (action: LineAction, hasToBeVisible = false) => {
		let currentLineActions = tempLineActions[action.line];

		// Generate LinesAction Object, which represents all actions of the line
		if (!currentLineActions) {
			currentLineActions = {
				line: action.line,
				actions: [],
				currentStyle: {},
			};
			tempLineActions[action.line] = currentLineActions;
		}

		// Don't add action if the line has to be visible for that
		// -> check if in the already added actions is an 'animate in' action,
		// if so check if the to add action happens before or after
		if (hasToBeVisible) {
			// TODO Maybe also handle the case when the line got animated out and then gets animated in again
			const animateInFrame =
				currentLineActions.actions.filter((a) => a.type === 'in')[0]?.from || 0;

			if (animateInFrame >= action.from) {
				return;
			}
		}

		// Add Action
		currentLineActions.actions.push(action);
	};

	// Extract Line Actions
	for (const action of actions) {
		let add = true;

		if (instanceOfLineAction(action)) {
			// Add highlight action to 'invertedActions',
			// since the actual action is to unhighlight the other lines
			if (action.type === 'highlight') {
				if (!invertedActions['highlight']) {
					invertedActions['highlight'] = {};
				}

				if (invertedActions['highlight'][action.from]) {
					invertedActions['highlight'][action.from].push(action.line);
				} else invertedActions['highlight'][action.from] = [action.line];

				// Add action because if we want to highlight a current unhiglighted line
				// we need this action to be performed
				add = true;
			}

			// Add unhighlight action to 'invertedActions',
			// since the actual action is to highlight the other lines
			if (action.type === 'unhighlight') {
				if (!invertedActions['unhighlight']) {
					invertedActions['unhighlight'] = {};
				}

				if (invertedActions['unhighlight'][action.from]) {
					invertedActions['unhighlight'][action.from].push(action.line);
				} else invertedActions['unhighlight'][action.from] = [action.line];

				// Don't add action because if we want to unhighlight a line,
				// the actual line shouldn't be unhighlighted,
				// instead the other lines should be highlighted
				add = false;
			}

			if (add) {
				addLineAction(action);
			}
		}
	}

	// Add actions to other lines based on the passed 'invertedActions' keymap
	const generateInvertedActions = (
		keymap: {[key: number]: number[]},
		actionType: string
	) => {
		for (const key in keymap) {
			const actionLines = keymap[key];

			for (let i = 0; i < linesOfCode; i++) {
				if (!actionLines.includes(i)) {
					addLineAction(
						{
							line: i,
							from: parseInt(key as any),
							type: actionType as any,
						},
						true
					);
				}
			}
		}
	};

	// Handle highlight Actions (-> unhighligh every other line except the highlighted lines)
	generateInvertedActions(invertedActions['highlight'], 'unhighlight');

	// Handle unhighlight Actions (-> highlight every other line except the unhighlighted lines)
	generateInvertedActions(invertedActions['unhighlight'], 'highlight');

	for (const key in tempLineActions) {
		const action = tempLineActions[key];

		// If line is visible
		if (action.actions.filter((action) => action.type !== 'in').length <= 0) {
			action.currentStyle = {opacity: 0, lineHeight: 0, fontSize: 0};
		}

		// Sort Actions based on Timing
		action.actions.sort((a, b) => {
			return a.from > b.from ? 1 : -1;
		});
	}

	return tempLineActions;
};

export const extractGeneralActions = (
	actions: (LineAction | GeneralAction)[]
): GeneralActions => {
	const tempGeneralActions: GeneralActions = {
		actions: [],
		currentStyle: {},
	};

	// Extract General Actions
	for (const action of actions) {
		if (instanceOfGeneralAction(action)) {
			tempGeneralActions.actions.push(action);
		}
	}

	tempGeneralActions.actions.sort((a, b) => {
		return a.from > b.from ? 1 : -1;
	});

	return tempGeneralActions;
};

export const getGeneralStyle = ({
	generalActions,
	frame,
	fps,
}: {
	generalActions: GeneralActions;
	frame: number;
	fps: number;
}) => {
	if (!generalActions || generalActions.actions.length <= 0) return {};

	// Get closest action to the current frame
	const closest = generalActions.actions.reduce((a, b) => {
		return Math.abs(b.from - frame) < Math.abs(a.from - frame) ? b : a;
	});

	const xAnimation =
		closest.x != null
			? spring({
					fps,
					frame: frame - closest.from,
					config: {
						stiffness: 200,
						damping: 100,
						mass: 0.5,
						overshootClamping: true,
					},
					to: closest.x,
					from: generalActions.currentStyle.left ?? undefined,
			  })
			: generalActions.currentStyle.left;

	const yAnimation =
		closest.y != null
			? spring({
					fps,
					frame: frame - closest.from,
					config: {
						stiffness: 200,
						damping: 100,
						mass: 0.5,
						overshootClamping: true,
					},
					to: closest.y,
					from: generalActions.currentStyle.top ?? undefined,
			  })
			: generalActions.currentStyle.top;

	const zAnimation =
		closest.z != null
			? spring({
					fps,
					frame: frame - closest.from,
					config: {
						stiffness: 200,
						damping: 100,
						mass: 0.5,
						overshootClamping: true,
					},
					to: closest.z,
					from: generalActions.currentStyle.zoom ?? 1,
			  })
			: generalActions.currentStyle.zoom;

	generalActions.currentStyle['left'] = xAnimation;
	generalActions.currentStyle['top'] = yAnimation;
	generalActions.currentStyle['zoom'] = zAnimation;

	return generalActions.currentStyle;
};

export const getLineStyle = ({
	lineActions,
	frame,
	fps,
}: {
	lineActions: LineActions;
	frame: number;
	fps: number;
}) => {
	if (!lineActions || lineActions.actions.length <= 0) return {};

	// Get closest action to the current frame
	const closest = lineActions.actions.reduce((a, b) => {
		return Math.abs(b.from - frame) < Math.abs(a.from - frame) ? b : a;
	});

	if (closest.type === 'out') {
		const animation = spring({
			fps,
			frame: frame - closest.from, // if this gets positive the spring animation starts -> when frame gets larger than closest.from
			config: {
				stiffness: 200,
				damping: 100,
				mass: 0.5,
				overshootClamping: true,
			},
			to: 0,
			from: lineActions.currentStyle.opacity ?? 1,
		});

		lineActions.currentStyle['opacity'] = animation;
		lineActions.currentStyle['lineHeight'] = interpolate(
			animation,
			[0, 1],
			[0, 1.53]
		);
		lineActions.currentStyle['fontSize'] = animation + 'em';
	}

	if (closest.type === 'in') {
		const animation = spring({
			fps,
			frame: frame - closest.from,
			config: {
				stiffness: 200,
				damping: 100,
				mass: 0.5,
				overshootClamping: true,
			},
			to: 1,
			from: lineActions.currentStyle.opacity ?? 0,
		});

		lineActions.currentStyle['opacity'] = animation;
		lineActions.currentStyle['lineHeight'] = interpolate(
			animation,
			[0, 1],
			[0, 1.53]
		);
		lineActions.currentStyle['fontSize'] = animation + 'em';
	}

	if (closest.type === 'unhighlight') {
		const animation = spring({
			fps,
			frame: frame - closest.from,
			config: {
				stiffness: 200,
				damping: 100,
				mass: 0.5,
				overshootClamping: true,
			},
			to: 0.3,
			from: lineActions.currentStyle.opacity ?? 1,
		});

		lineActions.currentStyle['opacity'] = animation;
	}

	if (closest.type === 'highlight') {
		const animation = spring({
			fps,
			frame: frame - closest.from,
			config: {
				stiffness: 200,
				damping: 100,
				mass: 0.5,
				overshootClamping: true,
			},
			to: 1,
			from: lineActions.currentStyle.opacity ?? 0.5,
		});

		lineActions.currentStyle['opacity'] = animation;
	}

	return lineActions.currentStyle;
};

export interface LineActions {
	line: number;
	actions: LineAction[];
	currentStyle: {[key: string]: any};
}

export interface LineAction {
	line: number;
	from: number;
	type: 'in' | 'out' | 'highlight' | 'unhighlight';
}

export function instanceOfLineAction(object: any): object is LineAction {
	return 'line' in object && 'from' in object && 'type' in object;
}

export interface GeneralActions {
	actions: GeneralAction[];
	currentStyle: {[key: string]: any};
}

export function instanceOfGeneralAction(object: any): object is GeneralAction {
	return 'from' in object && ('x' in object || 'y' in object || 'z' in object);
}

export interface GeneralAction {
	from: number;
	x?: number;
	y?: number;
	z?: number;
}
