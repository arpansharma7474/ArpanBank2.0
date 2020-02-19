import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native'

import WrapperComponent from '../WrapperComponent'
import UsersGridItem from '../reusable_comp/UserGridItem'
import TransactionsItem from '../reusable_comp/TransactionsItem'
import { connect } from 'react-redux'
import { normalize } from '../../utils/Constants'
import AlertModal from '../reusable_comp/AlertModal'

import { getUsers } from '../../redux/actions/UserActions'
import { logoutUser } from '../../redux/actions/AuthActions'
import { getLatestTransactions } from '../../redux/actions/TransactionActions'

const AdminScreen = props => {

    const [alert, setAlert] = useState(undefined)

    useEffect(() => {
        console.log("props", props)
        const getUsersFirebase = async () => {
            return await props.getUsers()
        }
        const getLatestTransactions = async () => {
            return await props.getLatestTransactions()
        }
        getUsersFirebase().then(res => {
            if (res.error)
                setAlert(res)
        })
        getLatestTransactions().then(res => {
            // if (res.error)
            //     setAlert(res)
        })
    }, []);

    return (
        <ScrollView
            style={{ flex: 1 }}>
            {alert ? <AlertModal
                message={alert}
                onOkClicked={() => {
                    setAlert(undefined)
                    props.logoutUser()
                        .then(res => {
                            props.navigation.reset({ index: 0, routes: [{ name: "Login" }] })
                        })
                }}
                onCancelClicked={alert.error ? null : () => {
                    setAlert(undefined)
                }}

            /> : null}
            <AppButton
                style={{
                    position: "absolute",
                    marginVertical: 10,
                    right: 10,
                    padding: 7
                }}
                title={"Logout"}
                onPress={() => {
                    setAlert({ success: "Are you sure you want to Logout?" })
                }}
            />
            {/**Money View */}
            <View style={[styles.main_views, {
                alignItems: "center",
                justifyContent: "center",
                marginTop: normalize(40)
            }]}>
                <Text
                    style={styles.money_text, {
                        fontSize: normalize(14),
                        color: "black",
                        textAlign: 'center',
                        fontFamily: "Monaco"
                    }}>Hello Admin, You have following amount of Rupees pending : </Text>
                <Text style={[styles.money_text, {
                    marginVertical: 20,
                    fontSize: normalize(30)
                }]}>Rs {props.totalMoney}</Text>
            </View>
            {/**Horizontal Users */}
            <View style={{ paddingHorizontal: 5 }}>
                <Text
                    style={[styles.normal_text, {
                        fontSize: normalize(14),
                        textAlign: "left",
                        color: "green",
                        marginStart: 5,
                    }]}>Top Users</Text>
                <FlatList
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    data={props.users}
                    renderItem={({ item, index }) =>
                        <UsersGridItem
                            onTransactionPressed={() => {
                                transactionsPressed(item)
                            }}
                            item={item}
                        />
                    }
                />
            </View>
            {/**Transactions */}
            <View style={[styles.main_views, {
                marginVertical: 5,
                marginHorizontal: 5,
                flexDirection: 'row',
                alignItems: 'center'
            }]}>
                <Text style={[styles.normal_text, {
                    fontSize: normalize(14),
                    marginVertical: 5,
                    textAlign: "left",
                    color: "green",
                }]}>Latest Transactions</Text>
                <AppButton
                    style={{
                        position: "absolute",
                        marginVertical: 5,
                        right: 10,
                        padding: 5
                    }}
                    title={"See All"}
                    onPress={() => {
                        transactionsPressed()
                    }}
                />
            </View>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={props.latestTransactions}
                renderItem={({ item, index }) =>
                    <TransactionsItem
                        item={item}
                    />
                }
            />
        </ScrollView>
    )
}

transactionsPressed = (item) => {
    alert("item")
}

const styles = StyleSheet.create({
    main_views: {
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
        totalMoney: state.UsersReducer.totalMoney,
        latestTransactions: state.TransactionReducer.latestTransactions
    };
}

export default connect(mapStateToProps, {
    getUsers,
    getLatestTransactions,
    logoutUser
})(WrapperComponent(AdminScreen))