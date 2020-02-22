import {
    LATEST_TRANSACTIONS,
    LOADING_STATUS
} from './types';
import firebase from 'react-native-firebase'
import { getMillisFromDate } from '../../utils/TimeUtils'

export const getLatestTransactions = () => {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS, payload: true });
        try {
            const firestoreRef = firebase.firestore().collection('transactions');
            const transactionsRef = await firestoreRef.orderBy("time", "desc").limit(3).get()
            const transactions = []
            transactionsRef.forEach(item => {
                transactions.push(item.data())
            })
            console.log(transactions, "transactions")
            dispatch({ type: LATEST_TRANSACTIONS, payload: transactions });
            dispatch({ type: LOADING_STATUS, payload: false });
            return { success: "Transactions found Successfully" };
        } catch (err) {
            console.log(err)
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
};

export const getUsersTransactions = (userId, page) => {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS, payload: true });
        try {
            const response = await fetch('https://us-central1-arpanbank-ac07f.cloudfunctions.net/transactions?userId=' + userId + '&page=' + page)
            const transactions = await response.json()
            console.log(transactions, "transactions")
            dispatch({ type: LOADING_STATUS, payload: false });
            return { success: transactions.transactions };
        } catch (err) {
            console.log(err)
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
};

