export const SELECT_CONVERSATION = "SELECT_CONVERSATION";
export function selectConversation(connection) {
    return {
        type: SELECT_CONVERSATION,
        payload: connection
    }
    
}