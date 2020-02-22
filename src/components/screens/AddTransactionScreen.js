import React from 'react'
import {
    Text,
    TextInput,
    View,
} from 'react-native'
import WrapperComponent from '../WrapperComponent'
import { normalize } from '../../utils/Constants'

class AddTransaction extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {

        }
        this.props.navigation.setOptions({
            title: "Add Transaction",
            headerStyle: {
                backgroundColor: "green",
            },
            headerTitleStyle: {
                fontFamily: "Monaco",
                fontSize: normalize(15)
            },
            headerTintColor: "white"
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

            </View>
        )
    }

}

export default WrapperComponent(AddTransaction)