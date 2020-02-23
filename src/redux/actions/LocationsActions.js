import firebase from 'react-native-firebase'
import { LOADING_STATUS } from '../actions/types'


export const getLocations = () => {
    dispatch({ type: LOADING_STATUS, payload: true });
    return async disptach => {
        try {
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