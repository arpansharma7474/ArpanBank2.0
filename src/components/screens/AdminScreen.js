import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    RefreshControl
} from 'react-native'

import WrapperComponent from '../WrapperComponent'
import UsersGridItem from '../reusable_comp/UserGridItem'
import TransactionsItem from '../reusable_comp/TransactionsItem'
import { connect } from 'react-redux'
import { normalize } from '../../utils/Constants'
import { showAlert } from '../../utils/AlertHelper'
import { useActionSheet } from '@expo/react-native-action-sheet'

import { getUsers, clearUserAccount } from '../../redux/actions/UserActions'
import { logoutUser, getUpdatedUser } from '../../redux/actions/AuthActions'
import { getLatestTransactions } from '../../redux/actions/TransactionActions'
import { log } from '../../utils/Logger'

const AdminScreen = props => {

    props.navigation.setOptions({
        headerShown: false
    });

    const [refreshing, setRefresh] = useState(false)
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => getAdminInfo(), []);

    const getAdminInfo = () => {
        const getUsersFirebase = async () => {
            return await props.getUsers()
        }
        const getLatestTransactions = async () => {
            return await props.getLatestTransactions()
        }
        const getUpdatedAdmin = async () => {
            return await props.getUpdatedUser(props.User.id)
        }
        getUpdatedAdmin().then(res => {
            if (res.error)
                showAlert(res.error)
        })
        getUsersFirebase().then(res => {
            if (res.error)
                showAlert(res.error)
        })
        getLatestTransactions().then(res => {
            if (res.error)
                showAlert(res.error)
        })
        setRefresh(false)
    }

    const onRefresh = () => {
        setRefresh(true)
        getAdminInfo()
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    tintColor={"green"}
                    refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ flex: 1 }}>
            <AppButton
                style={{
                    position: "absolute",
                    marginVertical: 10,
                    right: 10,
                    padding: 7
                }}
                title={"Logout"}
                onPress={() => {
                    showAlert("Are you sure you want to Logout?", "Logout", true)
                        .then(res => {
                            if (res > 0) {
                                props.navigation.reset({ index: 0, routes: [{ name: "Login" }] })
                            }
                        })
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
                            onActionsPressed={() => {
                                const options = ['Transactions', 'Clear Account Balance', 'Cancel'];
                                const destructiveButtonIndex = 2;
                                const cancelButtonIndex = 2;
                                showActionSheetWithOptions(
                                    {
                                        options,
                                        cancelButtonIndex,
                                        destructiveButtonIndex,
                                    },
                                    buttonIndex => {
                                        switch (buttonIndex) {
                                            case 0:
                                                transactionsPressed(props, item)
                                                break
                                            case 1:
                                                clearAccountPressed(props, item)
                                                break
                                        }
                                    },
                                );
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
                {/* <AppButton
                    style={{
                        position: "absolute",
                        marginVertical: 5,
                        right: 10,
                        padding: 5
                    }}
                    title={"See All"}
                    onPress={() => {
                        transactionsPressed(props)
                    }}
                /> */}
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

transactionsPressed = (props, user) => {
    props.navigation.navigate("TransactionsScreen", { user: user })
}

clearAccountPressed = async (props, user) => {
    const res = await showAlert("Are you sure you want to clear this user's pending amount?", "Clear Account", true)
    if (res > 0) {
        const res = await props.clearUserAccount(user)
        showAlert(res.error ? res.error : res.success)
    }
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
        latestTransactions: state.TransactionReducer.latestTransactions,
        User: state.persistedReducer.userDetails,
    };
}

export default connect(mapStateToProps, {
    getUsers,
    getLatestTransactions,
    logoutUser,
    clearUserAccount,
    getUpdatedUser
})(WrapperComponent(AdminScreen))