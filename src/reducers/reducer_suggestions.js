export default function(state = {}, action) { // ES6 state = null, if undefined, set it to NULL

    switch (action.type) {
        case 'FETCH_SUGGESTIONS':
            return action.payload;
        case 'FETCH_PROFILE':
            return {...state, [action.payload.uid]: action.payload}
	}
    // just return state if we do not care about action
    return state;
}