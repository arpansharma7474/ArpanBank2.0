import { log } from "./Logger";

// converts a js date string to seconds/minutes ago format
export const getTimeInReadableString = (dateInString, singleChar, dateJs) => {
    const date = dateJs ? dateJs : getDate(dateInString)
    const seconds = Math.ceil((new Date() - date) / 1000);
    let interval = Math.ceil(seconds / 31536000);
    if (interval > 1) {
        return interval + (singleChar ? "y" : " years ago")
    }
    interval = Math.ceil(seconds / 2592000);
    if (interval > 1) {
        return interval + (singleChar ? "m" : " months ago")
    }
    interval = Math.ceil(seconds / 86400);
    if (interval > 1) {
        return interval + (singleChar ? "d" : " days ago")
    }
    interval = Math.ceil(seconds / 3600);
    if (interval > 1) {
        return interval + (singleChar ? "h" : " hours ago")
    }
    interval = Math.ceil(seconds / 60);
    if (interval > 1) {
        return interval + (singleChar ? "m" : " minutes ago")
    }

    return Math.ceil(seconds) + (singleChar ? "s" : " seconds ago")
}

const getDate = dateString => {
    return new Date(dateString.replace(/-/g, '/'))
}

export const getRemainingDaysString = (saleEndDate) => {
    const endDate = getDate(saleEndDate)
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDateDiff = Math.round((endDate - new Date()) / oneDay)

    if (currentDateDiff < 0)
        return false

    if (currentDateDiff === 0) {
        return "Today"
    }

    if (currentDateDiff === 1) {
        return "in 1 Day"
    }

    if (currentDateDiff > 1) {
        return `in ${currentDateDiff} Days`
    }
}

export const getOrderDateString = dateInString => {
    return dateInString ? getDate(dateInString).toDateString() : ""
}


export const getMillisFromDate = (stringDate) => {
    // Date.parse('dd-MM-yyyy HH:mm');
    const spaceArray = stringDate.split(" ")
    const monthlyArray = spaceArray[0].split("-")
    //size = 3
    const dayTime = spaceArray[1].split(":")
    const year = monthlyArray[2]
    const month = monthlyArray[1]
    const date = monthlyArray[0]
    const hours = dayTime[0]
    const minutes = dayTime[1]
    return new Date(year, month, date, hours, minutes).getTime();
}