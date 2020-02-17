import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import { getUsers } from '../../redux/actions/UserActions'
import WrapperComponent from '../WrapperComponent'
import config from '../../utils/config'
import { connect } from 'react-redux'

const AdminScreen = props => {

    useEffect(() => {
        const getUsersFirebase = async () => {
            return await props.getUsers()
        }
        getUsersFirebase().then(res => {
            if (res.error)
                alert(JSON.stringify(res.error))
            else {
                console.log(props, "users")
            }
        })

    }, []);

    return (
        <View style={{ flex: 1 }}>
            {/**Money View */}
            <View style={[styles.main_views, {
                alignItems: "center",
                justifyContent: "center",
            }]}>
                <Text style={styles.money_text, {
                    fontSize: 14,
                    color: "black",
                    textAlign: 'center',
                    fontFamily: "Monaco"
                }}>Hello Admin, You have following amount of Rupees pending : </Text>
                <Text style={[styles.money_text, { marginTop: 5 }]}>Rs {props.totalMoney}</Text>
            </View>
            {/**Horizontal Users */}
            <View style={{ paddingHorizontal: 5 }}>
                <Text style={[styles.normal_text, {
                    fontSize: 14,
                    textAlign: "left",
                    color: "green",
                    marginStart: 5,
                }]}>Top Users</Text>
                <FlatList
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    data={props.users}
                    renderItem={({ item, index }) =>
                        <UsersGridItem
                            item={item}
                        />
                    }
                />
            </View>
            {/**Transactions */}
            <View style={styles.main_views}></View>
        </View>
    )

}


const UsersGridItem = props => {
    const item = props.item
    return (
        <View style={{
            borderWidth: 1,
            borderRadius: 5,
            minWidth: config.constants.width / 3,
            margin: 5,
            paddingVertical: 8,
            paddingHorizontal: 5,
            borderColor: 'black'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Image
                    style={{
                        height: 25,
                        aspectRatio: 1,
                        backgroundColor: 'grey',
                        borderRadius: 15
                    }}
                />
                <Text style={[styles.normal_text, {
                    fontSize: 10,
                    marginStart: 5
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
    main_views: {
        flex: 1,
        paddingHorizontal: 5
    },
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
function mapStateToProps(state) {
    return {
        Loading: state.LoadingReducer.loadingStatus,
        users: state.UsersReducer.users,
        totalMoney: state.UsersReducer.totalMoney
    };
}

export default connect(mapStateToProps, { getUsers })(WrapperComponent(AdminScreen))