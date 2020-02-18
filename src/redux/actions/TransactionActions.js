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
            const transactionsRef = await firestoreRef.get()
            const transactions = []
            console.log(transactionsRef, "jwefj")
            transactionsRef.forEach(item => {
                transactions.push(item.data())
            })
            const sortedTransactions = transactions.sort((a, b) => {
                //decending order
                return getMillisFromDate(b.date) - getMillisFromDate(a.date)
            })
            dispatch({ type: LATEST_TRANSACTIONS, payload: sortedTransactions.splice(0, 3) });
            dispatch({ type: LOADING_STATUS, payload: false });
            return { success: "Transactions found Successfully" };
        } catch (err) {
            console.log(err)
            dispatch({ type: LOADING_STATUS, payload: false });
            return { error: err };
        }
    };
};

