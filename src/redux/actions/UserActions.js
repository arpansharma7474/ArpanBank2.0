import {
    GET_USERS,
    LOADING_STATUS,
    USER_ACCOUNT_CLEARED
} from './types';
import firebase from 'react-native-firebase';
import { log } from '../../utils/Logger';
import { getTimeFormatted } from '../../utils/TimeUtils';

const saveUsers = (dispatch, payload) => {
    dispatch({ type: GET_USERS, payload: payload });
};

export const getUsers = (shouldShowProgress) => {
    return async dispatch => {
        if (shouldShowProgress)
            dispatch({ type: LOADING_STATUS, payload: true });
        try {
            const firestoreRef = firebase.firestore().collection('users');
            const usersRef = await firestoreRef.where("moneyOwed", ">=", 1).orderBy("moneyOwed", "desc").get()
            const users = []
            usersRef.docs.forEach(item => {
                users.push(item.data())
            })
            dispatch({ type: LOADING_STATUS, payload: false });
            saveUsers(dispatch, users)
            return { success: "Users found Successfully" };
        } catch (err) {
            log(err, "Error")
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
};

export const clearUserAccount = (user) => {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS, payload: true });
        try {
            const firestoreRef = firebase.firestore().collection('users');
            const clearAccountCollection = firebase.firestore().collection('clearAccountAction');

            const usersRef = await firestoreRef.where("id", "==", user.id).get()
            const userSelected = usersRef.docs[0].data()
            let moneyOwed = userSelected.moneyOwed
            userSelected.moneyOwed = 0
            await firestoreRef.doc(usersRef.docs[0].id).update(userSelected)
            dispatch({ type: USER_ACCOUNT_CLEARED, payload: { user: userSelected, moneyOwed: moneyOwed } });

            await clearAccountCollection.add({
                date: getTimeFormatted(new Date()),
                userId: userSelected.id
            })

            dispatch({ type: LOADING_STATUS, payload: false });
            return { success: "Account Cleared Successfully" };
        } catch (err) {
            log(err, "Error")
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
}
