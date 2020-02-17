import {
    USER_DETAILS,
    LOADING_STATUS,
} from './types';
import { googleSignin } from '../../utils/SocialLogin';
import firebase from 'react-native-firebase';

const persistUser = (dispatch, message) => {
    dispatch({ type: USER_DETAILS, payload: message });
};

export const googleLogin = () => {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS, payload: true });
        try {
            const loginResult = await googleSignin()
            const firestoreRef = firebase.firestore().collection('users');
            // check if the user already exists
            const checkUserDoc = await firestoreRef.where("id", "==", loginResult.uid).get()
            const checkUser = checkUserDoc.docs
            let returnUserObj = {}
            if (checkUser.length > 0) {
                returnUserObj = checkUser[0].data()
                // exists 
            } else {
                const device_token = await firebase.messaging().getToken();
                returnUserObj = {
                    "moneyOwed": 0,
                    "id": loginResult.uid,
                    "name": loginResult.name,
                    "email": loginResult.email,
                    "firebaseToken": device_token,
                    "photoUrl": loginResult.photoUrl,
                }
                const result = await firestoreRef.add(returnUserObj)
            }
            dispatch({ type: LOADING_STATUS, payload: false });
            persistUser(dispatch, returnUserObj);
            return { success: returnUserObj };
        } catch (err) {
            console.log(err)
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
};
