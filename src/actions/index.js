export const SEND_MESSAGE = 'SEND_MESSAGE';
export const LOGGED_IN = "LOGGED_IN"
export const CURRENT_USER = "CURRENT_USER"
export function sendMessage() {
    return {
        type: CREATE_POST,
        payload: request
    }
}

export function setCurrentUser(user) {
    return {
        type: CURRENT_USER,
        payload: user
    }
}