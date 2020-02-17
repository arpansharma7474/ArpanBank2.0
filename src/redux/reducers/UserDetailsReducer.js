
import { USER_DETAILS } from '../actions/types'
const INITIAL_STATE = {
    userDetails: {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_DETAILS:
            return { ...state, userDetails: action.payload }
        default:
            return state

    }
}