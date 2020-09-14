export const markers = (state = [], action) => {
    switch (action.type) {
        case 'GET_MARKERS':
            return [
                ...action.markers
            ]
        default:
            return state
    }
}