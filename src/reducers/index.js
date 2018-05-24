import { combineReducers } from 'redux';
import ActiveUserReducer from './reducer_active_user';
import MessagesReducer from './reducer_messages';
import AuthenticatedReducer from './reducer_authenticated';
import SuggestionsReducer from './reducer_suggestions';
import InvitationsReducer from './reducer_invitations';
import ConnectionsReducer from './reducer_connections';
import ActiveConversationReducer from './reducer_active_conversation';
import ConnectionsInfoReducer from './reducer_connections_info'

const rootReducer = combineReducers({
  active_user: ActiveUserReducer,
  messages: MessagesReducer,
  authenticated: AuthenticatedReducer,
  suggestions: SuggestionsReducer,
  invitations: InvitationsReducer,
  connections: ConnectionsReducer,
  active_conversation: ActiveConversationReducer,
  connections_info: ConnectionsInfoReducer
});

export default rootReducer;
