

import { LATEST_TRANSACTIONS } from '../actions/types'
const INITIAL_STATE = {
    latestTransactions: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LATEST_TRANSACTIONS:
            return {
                ...state,
                latestTransactions: action.payload
            }
        default:
            return state

    }
}