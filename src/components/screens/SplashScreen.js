import React, { useEffect } from 'react'
import {
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import WrapperComponent from '../WrapperComponent'
import config from '../../utils/config'

const SplashScreen = props => {

    useEffect(() => {
        setTimeout(() => {
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

export default WrapperComponent(SplashScreen)