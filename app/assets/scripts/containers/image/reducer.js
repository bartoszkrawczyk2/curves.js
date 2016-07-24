let renderCanvas = document.createElement('canvas'),
    renderCtx = renderCanvas.getContext('2d');

let defaultState = {
    defaultImage: 'resources/images/test.jpg',
    originalImage: null,
    renderCanvas,
    renderCtx
}

export default (state = defaultState, action) => {
	switch (action.type) {
        case 'SAVE_ORIGINAL_IMAGE':
            return Object.assign({}, state, {
                originalImage: action.imageData
            });

	    default:
	        return state
    }
}