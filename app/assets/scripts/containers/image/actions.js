export let saveOriginalImage = (imageData) => {
    return {
        type: 'SAVE_ORIGINAL_IMAGE',
        imageData
    }
}