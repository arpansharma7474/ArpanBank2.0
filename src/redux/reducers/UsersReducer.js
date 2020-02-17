

import { GET_USERS } from '../actions/types'
const INITIAL_STATE = {
    users: [],
    totalMoney: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USERS:
            let total = 0
            action.payload.forEach(user => {
                total = total + user.moneyOwed
            })
            return {
                ...state,
                users: [...action.payload],
                totalMoney: total
            }
        default:
            return state

    }
}