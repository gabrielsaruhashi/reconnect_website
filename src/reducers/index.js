import { combineReducers } from 'redux';
import ActiveUserReducer from './reducer_active_user';
import MessagesReducer from './reducer_messages';

const rootReducer = combineReducers({
  active_user: ActiveUserReducer,
  messages: MessagesReducer
});

export default rootReducer;
