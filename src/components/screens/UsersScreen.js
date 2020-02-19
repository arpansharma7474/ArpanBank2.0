import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
} from 'react-native'

import WrapperComponent from '../WrapperComponent'
import TransactionsItem from '../reusable_comp/TransactionsItem'
import { connect } from 'react-redux'
import { normalize } from '../../utils/Constants'

const UsersScreen = props => {
    useEffect(() => {
        const getUserTransactions = async () => {
            return await props.getLatestTransactions()
        }
        getUserTransactions().then(res => {
            if (res.error)
                alert(JSON.stringify(res.error))
        })
    })
    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default WrapperComponent(UsersScreen)
