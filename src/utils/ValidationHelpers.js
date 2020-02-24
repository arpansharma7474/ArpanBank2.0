


export const validateAddTransactionObject = ({ amount, message, date, location }) => {

    const errorObj = {}
    return new Promise(function (resolve, reject) {
        if (amount <= 0) {
            errorObj.error_amount = "Please enter Amount"
        }
        if (isEmpty(message)) {
            errorObj.error_message = "Please enter message"
        }
        if (isEmpty(date)) {
            errorObj.error_date = "Please select date"
        }
        if (Object.keys(location).length === 0) {
            errorObj.error_location = "Please select a location"
        }
        if (Object.keys(errorObj).length != 0)
            reject({ validationMessage: errorObj });
        else
            resolve('Successfull');
    })
}


const isEmpty = obj => {
    return obj.length === 0
}