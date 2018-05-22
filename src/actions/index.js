import firebase from 'firebase';
import _ from 'lodash';
//import { app } from '../base'

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

export function fetchInvitations(uid) {
    return dispatch => {
        firebase.database().ref(`/invitations/${uid}`).on('value', snapshot => {
          dispatch({
            type: FETCH_INVITATIONS,
            payload: snapshot.val()
          });
        });
    };
}

export function createInvitation(uid, invitee) {
    return dispatch => firebase.database().ref(`/invitations/${uid}`).push(invitee);
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