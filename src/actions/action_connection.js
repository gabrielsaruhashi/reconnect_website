import firebase from 'firebase';
import _ from 'lodash';

export const FETCH_RECONNECTIONS = "FETCH_RECONNECTIONS"

export function fetchReconnections(uid) {
    return dispatch => {
        firebase.database().ref(`/invitations`).child(`${uid}`).on('value', snapshot => {
          dispatch({
            type: FETCH_RECONNECTIONS,
            payload: snapshot.val()
          });
        });
    };
}

export function createConnection(connection, host, international) {
    return dispatch => firebase.database().ref(`/reconnections`).push(connection);
}

export function updateUserConnections(user, newReconnection_id) {
    var user_connections;

    if (user.connections) {
        user_connections = { ... user.connections, [newReconnection_id] : true};
    } else {
        user_connections = {[newReconnection_id]: true};
    }

    const newData_user = {
        connections: user_connections
    }

    return dispatch => firebase.database().ref('/users').child(`${user.uid}`).update(newData_user);
}

export function deleteInvitation(host, international) {
    return dispatch => firebase.database().ref(`/invitations/${host.uid}`).child(`${international.uid}`).remove();
}