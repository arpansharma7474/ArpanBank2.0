
import { Alert } from 'react-native'

export const showAlert = (
    message,
    title = "Alert",
    showCancel,
    positiveText,
    negativeText) => {

    const isJson = (message) => {
        return typeof (message) === 'object'
    }

    return new Promise(function (resolve, reject) {
        Alert.alert(title, isJson(message) ? JSON.stringify(message) : message.toString(), showCancel ? [
            { text: negativeText ? negativeText : 'Cancel', style: 'cancel', onPress: () => reject("No") },
            { text: positiveText ? positiveText : 'Ok', onPress: () => resolve("Yes") }] :
            [
                { text: 'Ok', onPress: () => resolve("Yes") }
            ]
        )
    })
}

