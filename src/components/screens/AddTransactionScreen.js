import React from 'react'
import {
    Text,
    TextInput,
    View,
} from 'react-native'
import WrapperComponent from '../WrapperComponent'
import { normalize } from '../../utils/Constants'
import AppTextField from '../reusable_comp/AppTextField'

class AddTransaction extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            error: undefined,
            amount: 0,
            message: ""
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
                <AppTextField
                    keyboardType='number-pad'
                    label={"Amount"}
                    onChangeText={text => {
                        this.setState({
                            amount: text
                        })
                    }}
                    error={this.state.error}
                />
                <AppTextField
                    label={"Message"}
                    onChangeText={text => {
                        this.setState({
                            message: text
                        })
                    }}
                    error={this.state.error}
                />
            </View>
        )
    }

}

export default WrapperComponent(AddTransaction)