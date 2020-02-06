// import { store } from '../App'
import { log } from './Logger'
import { AUTH_ERROR } from '../actions/types'

export const handleError = (endpoint, response) => {
    log(`Response for ${endpoint}`, response)
    // if (response.status.code == 401)
    //     store.dispatch({ type: AUTH_ERROR, payload: "401 Error" });

}