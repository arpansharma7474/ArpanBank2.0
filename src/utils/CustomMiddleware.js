import { log } from './Logger'
import { AUTH_ERROR, CLEAR_ALL } from '../actions/types';
import NavigationService from '../navigation/NavigationService'

// Middleware to clear user data and reset the navigation when the token has expired(AUTH_ERROR).
export const CustomMiddleware = store => next => action => {
    if (action.type === AUTH_ERROR) {
        log(action, "check action")
        store.dispatch({ type: CLEAR_ALL });
        NavigationService.navigate('LoginScreen', { session_timeout: true });
    }
    next(action)
}