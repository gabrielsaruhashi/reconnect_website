import firebase from 'firebase';

export const SELECT_CONVERSATION = "SELECT_CONVERSATION";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_CONNECTIONS_INFO = "FETCH_CONNECTIONS_INFO";

export function selectConversation(connection_id, person) {
    const conversation = {
        connection_id: connection_id,
        person: person
    };

    return {
        type: SELECT_CONVERSATION,
        payload: conversation
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

export function fetchConnectionsInfo(uid) {
    return dispatch => {
        firebase.database().ref(`/users`).child(`${uid}/connections`).on('value', snapshot => {
            const usersRef = firebase.database().ref('users');
            const data = snapshot.val();
            //console.log(data);
            const keys = Object.keys(data);
            var connections_info = {};

            // retrieve all connection's info using parallel method
            Promise.all(
                _.map(keys, id => {
                    const other_id = data[id];
                    return usersRef.child(`${other_id}`).once('value', snap => {
                        return snap;
                    })
                })
            ).then(res => {
                for (let i = 0; i < res.length; i++) {
                    connections_info[res[i].key] = res[i].val();
                }
                dispatch({
                    type: FETCH_CONNECTIONS_INFO,
                    payload: connections_info
                });

            })
        })
    }
}

export function createMessage(connection_id, message) {
    const newMessageKey = firebase.database().ref(`/messages`).child(`${connection_id}`).push().key;
    return dispatch => firebase.database().ref(`/messages`)
        .child(`${connection_id}/${newMessageKey}`).set(message);
}

export function updateLastMessageSent(connection_id, message) {
    var user_connections;

    const new_data = {
        last_message_sent: message
    }

    return dispatch => firebase.database().ref('/reconnections').child(`${connection_id}`).update(new_data);
}