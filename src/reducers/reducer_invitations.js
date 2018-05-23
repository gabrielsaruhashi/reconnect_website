export default function(state = {}, action) {
    switch (action.type) {
		case 'FETCH_INVITATIONS':
			return action.payload;
	}
    return state;
}