export default class User {
    id = undefined
    name = undefined
    moneyOwed = 0
    email = undefined
    firebaseToken = undefined
    photoUrl = undefined
    isAdmin = false

    constructor(user) {
        this.id = user.id
        this.name = user.name
        this.moneyOwed = user.moneyOwed
        this.email = user.email
        this.firebaseToken = user.firebaseToken
        this.photoUrl = user.photoUrl
        this.isAdmin = user.isAdmin
    }

}