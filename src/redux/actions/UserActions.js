import {
    GET_USERS,
    LOADING_STATUS,
} from './types';
import firebase from 'react-native-firebase';

const saveUsers = (dispatch, payload) => {
    dispatch({ type: GET_USERS, payload: payload });
};

export const getUsers = () => {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS, payload: true });
        try {
            const firestoreRef = firebase.firestore().collection('users');
            const usersRef = await firestoreRef.orderBy("moneyOwed", "desc").get()
            const users = []
            usersRef.docs.forEach(item => {
                if (item.data().moneyOwed)
                    users.push(item.data())
            })
            dispatch({ type: LOADING_STATUS, payload: false });
            saveUsers(dispatch, users)
            return { success: "Users found Successfully" };
        } catch (err) {
            console.log(err)
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
};
