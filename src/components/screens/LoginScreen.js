import React from 'react'
import WrapperComponent from '../WrapperComponent'
import {
    View,
    Text
} from 'react-native'

const LoginScreen = props => {
    return (
        <View>
            <Text>
                This is Login Screen
            </Text>
        </View>
    )
}

export default WrapperComponent(LoginScreen)