import firebase from 'firebase';

export const SELECT_CONVERSATION = "SELECT_CONVERSATION";
export const FETCH_MESSAGES = "FETCH_MESSAGES";

export function selectConversation(connection) {
    return {
        type: SELECT_CONVERSATION,
        payload: connection
    }
}

export function fetchMessages(reconnection_id) {
    return dispatch => {
        firebase.database().ref('messages/').child(`${reconnection_id}`)
        .on('value', snapshot => {
            dispatch({
                type: FETCH_MESSAGES,
                id: reconnection_id,
                payload: _.values(snapshot.val())
            });
        });
    };
}
export function createMessage(connection_id, message) {
    const newMessageKey = firebase.database().ref(`/messages`).child(`${connection_id}`).push().key;
    return dispatch => firebase.database().ref(`/messages`)
        .child(`${connection_id}/${newMessageKey}`).set(message);
}