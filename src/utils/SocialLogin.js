import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

export const googleSignin = async () => {
    try {
        await GoogleSignin.configure({
            webClientId: '163923950955-2duq15g0e4ijar8gvovmaog4p91grb72.apps.googleusercontent.com',
        });
        GoogleSignin.signOut();
        const data = await GoogleSignin.signIn()
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        const googleUser = await firebase.auth().signInWithCredential(credential)
        const userData = googleUser.user.toJSON().providerData[0]

        log(userData, "google res")
        return {
            email: userData.email,
            name: userData.displayName,
            uid: userData.uid,
            provider: "google",
            profile_picture: userData.photoURL
        }
    } catch (e) {
        if (!e.code === statusCodes.SIGN_IN_CANCELLED) {
            if (e.toString().startsWith("Error: RNGoogleSignInError"))
                log(e, "error")
            else
                throw e;
        }
    }
}   