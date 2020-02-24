import firebase from 'react-native-firebase'
import { LOADING_STATUS } from '../actions/types'


export const getLocations = () => {

    return async dispatch => {
        try {
            // dispatch({ type: LOADING_STATUS, payload: true });
            const res = await firebase.firestore().collection("locations").get()
            const array = []
            res.forEach(obj => {
                array.push(obj.data())
            })
            return ({ success: array })
        } catch (err) {
            console.log(err, "location error")
            return ({ error: err })
        }
    }
}