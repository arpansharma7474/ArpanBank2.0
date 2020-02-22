
import React from 'react'
import {
    View,
    Text
} from 'react-native'


export default EmptyView = props => {
    return (
        <View
            pointerEvents="none"
            style={[{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
            }, props.style]}>
            <Text style={{
                color: "black",
                textAlign: 'center',
                fontFamily: "Monaco"
            }}>
                {props.message}
            </Text>
        </View>
    )
}