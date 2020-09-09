export const markups = (state = [], action) => {
    switch (action.type) {
        case 'GET_MARKUPS':
            return [
                ...action.contacts
            ]
        default:
            return state
    }
}