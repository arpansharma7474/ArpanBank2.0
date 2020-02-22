import React, { useEffect } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    FlatList,
} from 'react-native'
import AppButton from '../reusable_comp/AppButton'
import WrapperComponent from '../WrapperComponent'
import TransactionsItem from '../reusable_comp/TransactionsItem'
import { connect } from 'react-redux'
import { getUsersTransactions } from '../../redux/actions/TransactionActions'
import { normalize } from '../../utils/Constants'

class UsersScreen extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            alert: undefined
        }
        props.navigation.setOptions({
            headerShown: false
        });
    }

    componentDidMount() {
        this.props.getUsersTransactions(this.props.User.id, this.props.page)
            .then(res => {
                console.log(this.props.usersTransactions, "props")
                if (res.error)
                    this.setState({
                        alert: res.error
                    })
                this.props.updateState({
                    showEmptyView: this.props.usersTransactions
                })
            })
    }

    render() {
        return (
            <ScrollView
                style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    position: "absolute",
                    right: 10
                }}>

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
                                    props.navigation.reset({ index: 0, routes: [{ name: "Login" }] })
                                })
                        }}
                    />
                </View>
                {/**Money View */}
                <View style={[styles.main_views, {
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: normalize(50)
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
                    data={this.props.usersTransactions.slice(0, 9)}
                    renderItem={({ item, index }) =>
                        <TransactionsItem
                            item={item}
                        />
                    }
                />
            </ScrollView>
        )
    }

    seeAllTransactionsPressed = () => {
        this.props.navigation.navigate("TransactionsScreen", { user: this.props.User })
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
    getUsersTransactions
})(WrapperComponent(UsersScreen, {
    empty_list_message: "No Transaction Found",
}))