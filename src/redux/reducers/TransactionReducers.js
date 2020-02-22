
import {
    LATEST_TRANSACTIONS,
    USER_TRANSACTIONS,
    USER_NEXT_TRANSACTIONS
} from '../actions/types'
const INITIAL_STATE = {
    latestTransactions: [],
    usersTransactions: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LATEST_TRANSACTIONS:
            return {
                ...state,
                latestTransactions: action.payload
            }
        case USER_TRANSACTIONS:
            return {
                ...state,
                usersTransactions: [...action.payload]
            }
        case USER_NEXT_TRANSACTIONS:
            return {
                ...state,
                latestTransactions: [state.latestTransactions, ...action.payload]
            }
        default:
            return state

    }
}