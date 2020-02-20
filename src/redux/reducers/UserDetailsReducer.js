
import { USER_DETAILS, CLEAR_ALL } from '../actions/types'
const INITIAL_STATE = {
    userDetails: {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_DETAILS:
            return { ...state, userDetails: {...action.payload} }
        case CLEAR_ALL:
            return INITIAL_STATE
        default:
            return state

    }
}