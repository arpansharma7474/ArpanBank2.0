import React from 'react'
import WrapperComponent from '../WrapperComponent'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { googleSignin } from '../../utils/SocialLogin'

const LoginScreen = props => {
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text style={styles.heading_text}>ArpanBank</Text>
            <Text style={styles.descrip_text}>We pay all Food finances for Zapbuild employees without any fees. You just pay at the end of the week</Text>
            <GoogleSigninButton
                style={{ height: 60, marginTop: 50 }}
                size={GoogleSigninButton.Size.Wide}
                // color={GoogleSigninButton.Color.Dark}
                onPress={() => onSignInPressed()}
            />
        </View>
    )
}

const onSignInPressed = () => {
    googleSignin()
}

export default WrapperComponent(LoginScreen)

const styles = StyleSheet.create({
    heading_text: {
        fontSize: 40,
        color: "black",
        fontFamily: "Monaco"
    },
    descrip_text: {
        fontSize: 12,
        paddingHorizontal: 10,
        color: "black",
        fontFamily: "Monaco",
        width: "100%",
        textAlign: "center"
    }
})