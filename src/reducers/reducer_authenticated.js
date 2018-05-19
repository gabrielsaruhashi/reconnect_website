// upon initialization, it is always null state
export default function(state = false, action) { // ES6 state = null, if undefined, set it to NULL

    switch (action.type) {
		case 'AUTHENTICATED':
			return action.payload;
	}
    // just return state if we do not care about action
    return state;
}