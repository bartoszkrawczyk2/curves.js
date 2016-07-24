export let changeChannel = (value) => {
    return {
        type: 'CHANGE_CHANNEL',
        value
    }
}

export let changeCurve = (value) => {
    return {
        type: 'CHANGE_CURVE',
        value
    }
}

export let changeImageCurve = () => {
    return {
        type: 'CHANGE_IMAGE_CURVE',
    }
}

export let addPoint = (x, y) => {
    return {
        type: 'ADD_POINT',
        x, y
    }
}

export let removePoint = (index) => {
    return {
        type: 'REMOVE_POINT',
        index
    }
}

export let resetState = () => {
    return {
        type: 'CURVES_RESET'
    }
}