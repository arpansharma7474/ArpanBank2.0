import {
    USER_DETAILS,
    LOADING_STATUS,
    CLEAR_ALL
} from './types';
import { googleSignin } from '../../utils/SocialLogin';
import firebase from 'react-native-firebase';
import { log } from 'react-native-reanimated';

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
            const device_token = await firebase.messaging().getToken();
            if (checkUser.length > 0) {
                returnUserObj = {
                    ...checkUser[0].data(),
                    firebaseToken: device_token,
                    photoUrl: loginResult.profile_picture
                }
                await firestoreRef.doc(checkUserDoc.docs[0].id).update(returnUserObj)
                // exists 
            } else {
                returnUserObj = {
                    "moneyOwed": 0,
                    "id": loginResult.uid,
                    "name": loginResult.name,
                    "email": loginResult.email,
                    "firebaseToken": device_token,
                    "photoUrl": loginResult.profile_picture,
                }
                log(returnUserObj, "userObj", loginResult)
                const result = await firestoreRef.add(returnUserObj)
            }
            dispatch({ type: LOADING_STATUS, payload: false });
            persistUser(dispatch, returnUserObj);
            return { success: returnUserObj };
        } catch (err) {
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
};

export const getUpdatedUser = (userId, shouldShowProgress) => {
    return async dispatch => {
        if (shouldShowProgress)
            dispatch({ type: LOADING_STATUS, payload: true });
        try {
            const firestoreRef = firebase.firestore().collection('users');
            const usersRef = await firestoreRef.where("id", "==", userId).get()
            const user = usersRef.docs[0].data()
            log("Updated User", user)
            persistUser(dispatch, user);
            dispatch({ type: LOADING_STATUS, payload: false });
            return { success: "UPdated user found" };
        } catch (err) {
            log(err, "Error")
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
}

export const logoutUser = () => {
    return async dispatch => {
        persistUser(dispatch, {});
    }
}
