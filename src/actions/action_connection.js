import firebase from 'firebase';
import _ from 'lodash';

export function createConnection(connection, host, international) {
    return dispatch => firebase.database().ref(`/reconnections`).push(connection);
}

export function updateUserConnections(user, new_connection) {
    var user_connections;

    if (user.connections) {
        user_connections = { ... user.connections, [new_connection.uid] : true};
    } else {
        user_connections = {[new_connection.uid]: true};
    }

    const newData_user = {
        connections: user_connections
    }

    console.log("Updating users");
    return dispatch => firebase.database().ref('/users').child(`${user.uid}`).update(newData_user);
}

export function deleteInvitation(host, international) {
    return dispatch => firebase.database().ref(`/invitations/${host.uid}`).child(`${international.uid}`).remove();
}