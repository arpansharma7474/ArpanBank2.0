import React, { useEffect } from 'react'
import {
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import WrapperComponent from '../WrapperComponent'
import config from '../../utils/config'
import { connect } from 'react-redux'

const SplashScreen = props => {

    useEffect(() => {
        setTimeout(() => {
            console.log(props.User, "props on splash")
            props.navigation.navigate("Login")
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