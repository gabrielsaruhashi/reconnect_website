export default function(state = {}, action) {
    switch (action.type) {
		case 'FETCH_INVITATIONS':
			console.log(action.payload);
			return action.payload;
	}
    return state;
}