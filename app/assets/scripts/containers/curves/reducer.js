const defaultState = () => {
	return {
		currentCurves: {
			a: { xs: [0, 1], ys: [0, 1] },
			r: { xs: [0, 1], ys: [0, 1] },
			g: { xs: [0, 1], ys: [0, 1] },
			b: { xs: [0, 1], ys: [0, 1] }
		},
		currentChannel: 'a',
	}
}

export default (state = defaultState(), action) => {
	switch (action.type) {
		case 'CHANGE_CURVE': {
			let curveToChange = {};

			curveToChange[state.currentChannel] = action.value;

			return Object.assign({}, state, {
				currentCurves: Object.assign({}, state.currentCurves, curveToChange),
			});
		}

		case 'CHANGE_CHANNEL':
			return Object.assign({}, state, {
				currentChannel: action.value
			});

		case 'ADD_POINT': {
			let index = null;
			let newPoints = Object.assign({}, state.currentCurves);

			for (let i = 0; i < newPoints[state.currentChannel].xs.length; i++) {
				if (
					action.x > newPoints[state.currentChannel].xs[i] &&
					action.x < newPoints[state.currentChannel].xs[i+1]
				) {
					index = i+1;
					continue;
				}
			}

			newPoints[state.currentChannel].xs.splice(index, 0, action.x);
			newPoints[state.currentChannel].ys.splice(index, 0, action.y);

			return Object.assign({}, state, {
				currentCurves: newPoints,
			});
		}

		case 'REMOVE_POINT': {
			let newPoints = Object.assign({}, state.currentCurves);
			
			if (action.index === 0 || action.index >= newPoints[state.currentChannel].xs.length - 1) return state;
			
			newPoints[state.currentChannel].xs.splice(action.index, 1);
			newPoints[state.currentChannel].ys.splice(action.index, 1);

			return Object.assign({}, state, {
				currentCurves: newPoints,
			});;
		}

		case 'CURVES_RESET':
			return defaultState()

	    default:
	        return state
    }
}