// upon initialization, it is always null state
export default function(state = null, action) { // ES6 state = null, if undefined, set it to NULL

    switch (action.type) {
		case 'CURRENT_USER':
			// selected book
			return action.payload;
	}
    // just return state if we do not care about action
    return state;
}