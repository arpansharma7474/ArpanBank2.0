import React from 'react'
import {
    ImageBackground
} from 'react-native'
import WrapperComponent from '../WrapperComponent'
import config from '../../utils/config'

const SplashScreen = props => {
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