import firebase from 'firebase';
import _ from 'lodash';

export const FETCH_CONNECTIONS = "FETCH_CONNECTIONS"


export function fetchConnections(uid) {
    return dispatch => {
        firebase.database().ref(`/users`).child(`${uid}/connections`).on('value', snapshot => {
            // reference to storage
            const connectionsRef = firebase.database().ref('reconnections');
            const data = snapshot.val();

            // get the ids of the reconnections
            const keys = Object.keys(data);
            var connections = {};
            
            // retrieve all reconnections using a parallel method
            Promise.all(
                _.map(keys, id => {
                    return connectionsRef.child(`${id}`).once('value', snap => {
                        return snap;
                    })
                })
            ).then( res => {
                
                for (let i = 0; i < res.length; i++) {
                    connections[res[i].key] = res[i].val();
                }

                dispatch({
                    type: FETCH_CONNECTIONS,
                    payload: connections
                });
            });
        
        });
    };
}

export function createConnection(connection) {
    return dispatch => firebase.database().ref(`/reconnections`).push(connection);
}

export function updateUserConnections(user, newReconnection_id, other) {
    var user_connections;

    if (user.connections) {
        user_connections = { ... user.connections, [newReconnection_id] : other.uid};
    } else {
        user_connections = {[newReconnection_id]: other.uid};
    }

    const newData_user = {
        connections: user_connections
    }

    return dispatch => firebase.database().ref('/users').child(`${user.uid}`).update(newData_user);
}

export function deleteInvitation(host, international) {
    return dispatch => firebase.database().ref(`/invitations/${host.uid}`).child(`${international.uid}`).remove();
}