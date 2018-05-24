// upon initialization, it is always null state
export default function(state = {}, action) { // ES6 state = null, if undefined, set it to NULL

    switch (action.type) {
		case 'FETCH_MESSAGES':
			return {...state, [action.id]: action.payload};
	}
    return state;
}