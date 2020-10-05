export const alerts = (state, action) => {
    const {type, message, visibility}
    switch (type) {
        case CHANGE_ALERT:
            return {message, visibility}
    
        default:
            break;
    }
}