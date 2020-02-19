// Firebase rules : Replace false with request.auth.uid !=null

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBmsquvtewJB-DCalt8pgJZeypwLUxKrEU",
    authDomain: "arpanbank-ac07f.firebaseapp.com",
    projectId: "arpanbank-ac07f"
});

const database = firebase.firestore();

/**This function will update the transactions collection and add time(millis : which can be used to sort)... but only for the enteries that have date(rest will be lost)*/
checkTransactions = async () => {
    try {
        const result = await database.collection("transactions").get()
        for (let i = 0; i < result.docs.length; i++) {
            const item = result.docs[i].id
            const currentDoc = database.collection("transactions").doc(item)
            // const res = await currentDoc.update({
            //     time: item.data().date ? getMillisFromDate(item.data().date) : 1320990071000
            // })
            console.log(currentDoc, "updated")
        }
    } catch (err) {
        console.log("Error", err)
    }
    process.exit()
}

const getMillisFromDate = (stringDate) => {
    const spaceArray = stringDate.split(" ")
    const monthlyArray = spaceArray[0].split("-")
    const dayTime = spaceArray[1].split(":")
    return new Date(year = monthlyArray[2],
        month = monthlyArray[1] - 1,
        date = monthlyArray[0],
        hours = dayTime[0],
        minutes = dayTime[1]).getTime();
}

checkTransactions()