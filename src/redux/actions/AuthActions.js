import {
    USER_DETAILS,
    LOADING_STATUS,
} from './types';
import { googleSignin } from '../../utils/SocialLogin';

import firebase from 'react-native-firebase';

const persistUser = (dispatch, message) => {
    dispatch({ type: USER_DETAILS, payload: message });
};

export const googleLogin = (googleObject) => {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS, payload: true });
        try {
            // const device_token = await firebase.messaging().getToken();
            const loginResult = await googleSignin()
            dispatch({ type: LOADING_STATUS, payload: false });
            persistUser(dispatch, loginResult);
            return { success: loginResult };
        } catch (err) {
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
};
