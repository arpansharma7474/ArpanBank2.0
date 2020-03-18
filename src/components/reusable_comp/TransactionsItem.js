import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { normalize } from '../../utils/Constants'
import { getTimeInReadableString, getOrderDateString } from '../../utils/TimeUtils'

export default TransactionsItem = props => {
    const item = props.item
    return (
        <View style={{
            width: "95%",
            marginVertical: 5,
            alignSelf: 'center',
            borderRadius: 10,
            minHeight: 100,
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            flexDirection: 'row',
            overflow: "hidden"
        }}>
            <View
                style={{
                    width: 15,
                    backgroundColor: item.isPaid ? "green" : "red"
                }}
            ></View>
            <View style={{
                marginStart: 10,
                flex: 1,
                justifyContent: 'center'
            }}>
                {!props.hideCustomer && <Text style={{
                    fontSize: normalize(12),
                    fontFamily: "Monaco",
                    color: 'black',
                }}>Customer : {item.user ? item.user.name : item.fromUser}</Text>}
                <View style={{
                    marginTop: 5,
                    flexDirection: 'row'
                }}>
                    <Text
                        style={{
                            fontSize: normalize(12),
                            fontFamily: "Monaco",
                            color: 'black',
                        }}>Message : </Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                        style={{
                            flex: 1,
                            fontSize: normalize(12),
                            fontFamily: "Monaco",
                            color: 'black',
                        }}>{item.message}</Text>
                    <Text style={[styles.text, {
                        marginEnd: 10,
                    }]}>Rs {item.amount}</Text>
                </View>
                <Text style={{
                    fontSize: normalize(12),
                    fontFamily: "Monaco",
                    color: 'black',
                    marginTop: 5
                }}>Date : {new Date(item.time).toDateString()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: normalize(14),
        fontFamily: "Monaco",
        color: 'green'
    }
})