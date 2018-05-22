export default function(state = {}, action) {

    switch (action.type) {
		case 'FETCH_INVITATIONS':
			// selected book
			return action.payload;
	}
    // just return state if we do not care about action
    return state;
}