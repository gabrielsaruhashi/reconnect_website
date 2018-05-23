import firebase from 'firebase';
import _ from 'lodash';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CURRENT_USER = "CURRENT_USER";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const AUTHENTICATE = "AUTHENTICATED";
export const FETCH_SUGGESTIONS = "FETCH_SUGGESTIONS";
export const FETCH_PROFILE = "FETCH_PROFILE";
export const FETCH_INVITATIONS = "FETCH_INVITATIONS";
export const CREATE_INVITATION = "CREATE_INVITATION";

export function sendMessage(message) {
    return dispatch => firebase.database().ref('messages/').push(message)
}

export function fetchMessages() {
    return dispatch => {
        firebase.database().ref('messages/').on('value', snapshot => {
          dispatch({
            type: FETCH_MESSAGES,
            payload: _.values(snapshot.val())
          });
        });
      };
}

export function fetchSuggestions() {
    return dispatch => {
      firebase.database().ref('/users').on('value', snapshot => {
        dispatch({
          type: FETCH_SUGGESTIONS,
          payload: snapshot.val()
        });
      });
    };
}
export function fetchProfile(uid) {
    return dispatch => {
        firebase.database().ref(`/users/${uid}`).on('value', snapshot => {
          dispatch({
            type: FETCH_PROFILE,
            payload: snapshot.val()
          });
        });
    };
}

export function fetchInvitations() {
    return dispatch => {
        firebase.database().ref(`/invitations`).on('value', snapshot => {
          dispatch({
            type: FETCH_INVITATIONS,
            payload: snapshot.val()
          });
        });
    };
}

export function createInvitation(sender_profile, recipient_uid) {
    return dispatch => firebase.database().ref(`/invitations`).child(`${recipient_uid}/${sender_profile.uid}`).set(sender_profile);
}

export function updateUserInvitations(user, invitee) {
    var user_invitations;
    if (user.invitations) {
        user_invitations = { ... user.invitations, [invitee.uid] : true};
    } else {
        user_invitations = {[invitee.uid]: true};
    }

    const newData_user = {
        invitations: user_invitations
    }
    return dispatch => firebase.database().ref('/users').child(`${user.uid}`).update(newData_user);
}
export function setCurrentUser(user) {
    return {
        type: CURRENT_USER,
        payload: user
    }
}

export function authenticate(status) {
    return {
        type: AUTHENTICATE,
        payload: status
    }
}