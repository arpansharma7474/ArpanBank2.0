import React, { useEffect } from 'react'
import {
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import WrapperComponent from '../WrapperComponent'
import config from '../../utils/config'
import { connect } from 'react-redux'

const SplashScreen = props => {

    props.navigation.setOptions({
        headerShown: false
    });

    useEffect(() => {
        setTimeout(() => {
            let routeName = ""
            if (props.User.name) {
                if (props.User.isAdmin)
                    routeName = "Admin"
                else
                    routeName = "UsersScreen"
            } else
                routeName = "Login"
            props.navigation.reset({ index: 0, routes: [{ name: routeName }] })
        }, 1000)
    }, []);

    return (
        <ImageBackground
            style={{
                height: config.constants.height,
                width: config.constants.width
            }}
            source={require("../../assets/ic_splash.png")}
        />
    )
}

function mapStateToProps(state) {
    return {
        User: state.persistedReducer.userDetails
    };
}

export default connect(mapStateToProps, {})(WrapperComponent(SplashScreen))