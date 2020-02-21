import React, { useEffect } from 'react'
import WrapperComponent from '../WrapperComponent'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { googleLogin } from '../../redux/actions/AuthActions'
import { connect } from 'react-redux'

class LoginScreen extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={styles.heading_text}>ArpanBank</Text>
                <Text style={styles.descrip_text}>We pay all Food finances for Zapbuild employees without any fees. You just pay at the end of the week</Text>
                <GoogleSigninButton
                    style={{ marginTop: 50 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => this.onSignInPressed()}
                />
            </View>
        )
    }
    onSignInPressed = _ => {
        this.props.googleLogin()
            .then(res => {
                if (this.props.User.isAdmin)
                    this.props.navigation.navigate("Admin")
                else
                    this.props.navigation.navigate("UsersScreen")
            })
    }
}

function mapStateToProps(state) {
    return {
        Loading: state.LoadingReducer.loadingStatus,
        User: state.persistedReducer.userDetails
    };
}

export default connect(mapStateToProps, { googleLogin })(WrapperComponent(LoginScreen))

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