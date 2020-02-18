import React, { useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
} from 'react-native'
import { getUsers } from '../../redux/actions/UserActions'
import WrapperComponent from '../WrapperComponent'
import UsersGridItem from '../reusable_comp/UserGridItem'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

const AdminScreen = props => {
    useEffect(() => {
        const getUsersFirebase = async () => {
            return await props.getUsers()
        }
        const getLatestTransactions = async () => {
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
        <ScrollView
            style={{ flex: 1 }}>
            {/**Money View */}
            <View style={[styles.main_views, {
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 20
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
                    numColumns={3}
                    keyExtractor={(item) => item.id}
                    data={props.users.slice(0, 9)}
                    renderItem={({ item, index }) =>
                        <UsersGridItem
                            item={item}
                        />
                    }
                />
            </View>
            {/**Transactions */}
            <View style={styles.main_views}>
                <Text style={[styles.normal_text, {
                    fontSize: 14,
                    textAlign: "left",
                    color: "green",
                    marginStart: 5,
                    marginTop: 10
                }]}>Latest Transactions</Text>
            </View>
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
        users: state.UsersReducer.users,
        totalMoney: state.UsersReducer.totalMoney
    };
}

export default connect(mapStateToProps, { getUsers })(WrapperComponent(AdminScreen))