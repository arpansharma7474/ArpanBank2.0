import React from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import config from '../../utils/config'

export default UsersGridItem = props => {
    const item = props.item
    return (
        <View style={{
            borderWidth: 1,
            borderRadius: 5,
            width: (config.constants.width / 3) - 15,
            margin: 5,
            paddingVertical: 8,
            paddingHorizontal: 5,
            borderColor: 'black'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                overflow: "hidden"
            }}>
                <Image
                    style={{
                        height: 25,
                        aspectRatio: 1,
                        backgroundColor: 'grey',
                        borderRadius: 15
                    }}
                />
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={[styles.normal_text, {
                        fontSize: 10,
                        marginStart: 5,
                    }]}>{item.name}</Text>
            </View>
            <Text style={[styles.money_text, {
                fontSize: 18,
                textAlign: 'center',
            }]}>Rs {item.moneyOwed}</Text>
            <TouchableOpacity style={{
                marginTop: 5,
                padding: 2,
                borderWidth: StyleSheet.hairlineWidth,
                borderRadius: 20,
                backgroundColor: "green",
            }}>
                <Text style={[styles.normal_text, {
                    fontSize: 12,
                    textAlign: 'center',
                    color: 'white'
                }]}>Transactions</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    money_text: {
        textAlignVertical: "center",
        textAlign: "center",
        fontFamily: "Monaco",
        color: "green",
        fontSize: 22
    },
    normal_text: {
        fontSize: 14,
        color: "black",
        textAlign: 'center',
        fontFamily: "Monaco"
    }
})