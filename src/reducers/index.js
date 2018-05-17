import { combineReducers } from 'redux';
import ActiveUserReducer from './reducer_active_user'

const rootReducer = combineReducers({
  active_user: ActiveUserReducer,
});

export default rootReducer;
