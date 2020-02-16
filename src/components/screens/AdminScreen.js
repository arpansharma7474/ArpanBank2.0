import React, { useEffect } from 'react'
import {
    TouchableOpacity, View
} from 'react-native'
import WrapperComponent from '../WrapperComponent'
import config from '../../utils/config'

const AdminScreen = props => {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Text>THis is Admin Screen</Text>
        </View>
    )
}

export default WrapperComponent(AdminScreen)