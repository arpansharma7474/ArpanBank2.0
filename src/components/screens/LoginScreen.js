import React, { useEffect } from 'react'
import WrapperComponent from '../WrapperComponent'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { googleLogin } from '../../redux/actions/AuthActions'
import { connect } from 'react-redux'
import AppButton from '../reusable_comp/AppButton'
import config from '../../utils/config';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.props.navigation.setOptions({
            headerShown: false
        });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Image
                    style={{
                        width: config.constants.width / 3,
                        aspectRatio: 1
                    }}
                    source={require("../../assets/ic_dollar.png")}
                />
                <Text style={styles.heading_text}>ArpanBank</Text>
                <Text style={styles.descrip_text}>We pay all Food finances for Zapbuild employees without any fees. You just pay at the end of the week</Text>
                <AppButton
                    style={{
                        padding: 10,
                        marginTop: 20
                    }}
                    title={"Login Using Google Account"}
                    onPress={() => {
                        this.onSignInPressed()
                    }}
                />
            </View>
        )
    }
    onSignInPressed = _ => {
        this.props.googleLogin()
            .then(res => {
                if (res.success) {
                    if (this.props.User.isAdmin)
                        this.props.navigation.reset({ index: 0, routes: [{ name: "Admin" }] })
                    else
                        this.props.navigation.reset({ index: 0, routes: [{ name: "UsersScreen" }] })
                }
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
        fontFamily: "Monaco",
        marginTop: 20,
    },
    descrip_text: {
        fontSize: 12,
        paddingHorizontal: 10,
        marginTop: 20,
        color: "black",
        fontFamily: "Monaco",
        width: "100%",
        textAlign: "center"
    }
})