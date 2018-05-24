import firebase from 'firebase';
import _ from 'lodash';

export const FETCH_CONNECTIONS = "FETCH_CONNECTIONS"

function loadConnectionsParallel(keys, callback) {

}
export function fetchConnections(uid) {
    return dispatch => {
        firebase.database().ref(`/users`).child(`${uid}/connections`).on('value', snapshot => {
            const connectionsRef = firebase.database().ref('reconnections');
            const data = snapshot.val();
            const keys = Object.keys(data);
            var connections = {};
            
            // retrieve all reconnections using a parallel method
            Promise.all(
                _.map(keys, id => {
                    return connectionsRef.child(`${id}`).once('value', snap => {
                        return snap;
                    })
                })
            ).then( r => 
                {
                    for (let i = 0; i < r.length; i++) {
                        connections[r[i].key] = r[i].val();
                    }
                    dispatch({
                        type: FETCH_CONNECTIONS,
                        payload: connections
                    });
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