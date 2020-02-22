


import React from 'react'
import {

} from 'react-native'
import {
    OutlinedTextField,
} from 'react-native-material-textfield';


export default TextField = props => {
    return (
        <OutlinedTextField
            style={{
                fontFamily: "Monaco"
            }}
            containerStyle={{
                margin: 10
            }}
            labelTextStyle={{
                fontFamily: "Monaco"
            }}
            label={props.label}
            error={props.error}
            keyboardType={props.keyboardType}
            tintColor="green"
            onChangeText={text => {
                if (props.onChangeText)
                    props.onChangeText(text)
            }}
        />
    )
}