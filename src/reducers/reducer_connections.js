export default function(state = {}, action) { // ES6 state = null, if undefined, set it to NULL

    switch (action.type) {
		case 'FETCH_CONNECTIONS':
			return action.payload;

	}
    return state;
}