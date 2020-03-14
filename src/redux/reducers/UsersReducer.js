

import { GET_USERS, USER_ACCOUNT_CLEARED } from '../actions/types'
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
        case USER_ACCOUNT_CLEARED:
            const user = action.payload.user
            let totalTemp = state.totalMoney - action.payload.moneyOwed
            let updatedUsers = state.users.filter(item => item.id != user.id)
            return {
                ...state,
                users: updatedUsers,
                totalMoney: totalTemp
            }
        default:
            return state

    }
}