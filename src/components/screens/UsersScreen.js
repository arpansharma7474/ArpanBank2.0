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
import { normalize } from '../../utils/Constants'

const UsersScreen = props => {

    useEffect(() => {
        const getUserTransactions = async () => {
            // return await props.getLatestTransactions()
        }
        getUserTransactions().then(res => {
            // if (res.error)
            //     alert(JSON.stringify(res.error))
        })
    }, []);

    return (
        <ScrollView
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
    };
}

export default connect(mapStateToProps, {

})(WrapperComponent(UsersScreen))