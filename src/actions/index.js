import firebase from 'firebase';
import _ from 'lodash';
//import { app } from '../base'

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CURRENT_USER = "CURRENT_USER";
export const FETCH_MESSAGES = "FETCH_MESSAGES"
export const AUTHENTICATE = "AUTHENTICATED"
export const FETCH_SUGGESTIONS = "FETCH_SUGGESTIONS"
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