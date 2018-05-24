export default function(state = null, action) { // ES6 state = null, if undefined, set it to NULL

    switch (action.type) {
		case 'SELECT_CONVERSATION':
			return action.payload;
	}
    return state;
}