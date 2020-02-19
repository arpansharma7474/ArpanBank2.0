import React from 'react'
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { normalize } from '../../utils/Constants'

export default AppButton = props => {
    return (
        <TouchableOpacity
            onPress={() => {
                if (props.onPress)
                    props.onPress()
            }}
            style={[{
                padding: normalize(3),
                marginVertical: 5,
                borderWidth: StyleSheet.hairlineWidth,
                borderRadius: 20,
                backgroundColor: "green",
            }, props.style]}>
            <Text style={[styles.normal_text, {
                fontSize: normalize(11),
                textAlign: 'center',

                color: 'white'
            }]}>{props.title}</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    normal_text: {
        fontSize: 14,
        color: "black",
        textAlign: 'center',
        fontFamily: "Monaco"
    }
})