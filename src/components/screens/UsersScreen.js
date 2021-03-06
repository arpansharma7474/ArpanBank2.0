import React from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native'
import AppButton from '../reusable_comp/AppButton'
import WrapperComponent from '../WrapperComponent'
import TransactionsItem from '../reusable_comp/TransactionsItem'
import { connect } from 'react-redux'
import {
    getUsersTransactions,
    generatePaidRequest
} from '../../redux/actions/TransactionActions'
import { logoutUser, getUpdatedUser } from '../../redux/actions/AuthActions'
import { showAlert } from '../../utils/AlertHelper'
import { normalize } from '../../utils/Constants'
import { log } from '../../utils/Logger'

class UsersScreen extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false
        }
        props.navigation.setOptions({
            headerShown: false
        });
    }

    componentDidMount() {
        this.getUpdatedUser()
    }

    getUpdatedUser = async () => {
        await this.props.getUpdatedUser(this.props.User.id)
        const res = await this.props.getUsersTransactions(this.props.User.id, this.props.page)
        if (res.error)
            showAlert(res.error)
        this.props.updateState({
            showEmptyView: !this.props.usersTransactions
        })
        this.setState({
            refreshing: false
        })
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getUpdatedUser()
        })
    }

    render() {
        return (
            <View
                style={{ flex: 1 }}>
                <ScrollView
                    horizontal={true}
                    style={{
                        flexDirection: 'row',
                        position: "absolute",
                        right: 10
                    }}>
                    <AppButton
                        style={{
                            marginVertical: 10,
                            padding: 7
                        }}
                        title={"Generate Paid Request"}
                        onPress={() => {
                            this.onPaidRequestClicked()
                        }}
                    />
                    <AppButton
                        style={{
                            marginVertical: 10,
                            marginHorizontal: 10,
                            padding: 7
                        }}
                        title={"Add Money"}
                        onPress={() => {
                            this.props.navigation.navigate("AddTransactionScreen")
                        }}
                    />

                    <AppButton
                        style={{
                            marginVertical: 10,
                            padding: 7
                        }}
                        title={"Logout"}
                        onPress={() => {
                            this.props.logoutUser()
                                .then(res => {
                                    this.props.navigation.reset({ index: 0, routes: [{ name: "Login" }] })
                                })
                        }}
                    />
                </ScrollView>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={"green"}
                            refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                    style={{
                        flex: 1,
                        marginTop: normalize(50)
                    }}>
                    {/**Money View */}
                    <View style={[styles.main_views, {
                        alignItems: "center",
                        justifyContent: "center",
                    }]}>
                        <Text
                            style={styles.money_text, {
                                fontSize: normalize(14),
                                color: "black",
                                textAlign: 'center',
                                fontFamily: "Monaco"
                            }}>Hello {this.props.User.name}, You have following amount pending : </Text>
                        <Text style={[styles.money_text, {
                            marginVertical: 20,
                            fontSize: normalize(30)
                        }]}>Rs {this.props.User.moneyOwed}</Text>
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
                        {this.props.usersTransactions.length > 0 ? <AppButton
                            style={{
                                position: "absolute",
                                marginVertical: 5,
                                right: 10,
                                padding: 5
                            }}
                            title={"See All"}
                            onPress={() => {
                                this.seeAllTransactionsPressed()
                            }}
                        /> : null}
                    </View>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={this.props.usersTransactions.slice(0, 5)}
                        renderItem={({ item, index }) =>
                            <TransactionsItem
                                hideCustomer
                                item={item}
                            />
                        }
                    />
                </ScrollView>
            </View>
        )
    }

    seeAllTransactionsPressed = () => {
        this.props.navigation.navigate("TransactionsScreen", { user: this.props.User })
    }

    onPaidRequestClicked = async () => {
        const res = await this.props.generatePaidRequest()
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
        User: state.persistedReducer.userDetails,
        usersTransactions: state.TransactionReducer.usersTransactions
    };
}

export default connect(mapStateToProps, {
    getUsersTransactions,
    logoutUser,
    generatePaidRequest,
    getUpdatedUser
})(WrapperComponent(UsersScreen, {
    empty_list_message: "No Transaction Found",
}))