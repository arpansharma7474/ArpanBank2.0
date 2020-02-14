import React from 'react'
import {
    View,
    Text
} from 'react-native'
import WrapperComponent from '../WrapperComponent'

const SplashScreen = props => {

    return (
        <View>
            <Text>
                This is Splash Screen
            </Text>
        </View>
    )
}

export default WrapperComponent(SplashScreen)