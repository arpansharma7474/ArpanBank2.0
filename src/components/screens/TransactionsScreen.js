import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, FlatList } from 'react-native';
import WrapperComponent from '../WrapperComponent';
import { connect } from 'react-redux';
import { getUsersTransactions } from '../../redux/actions/TransactionActions'
import AlertModal from '../reusable_comp/AlertModal'
import { normalize } from '../../utils/Constants';

class TransactionScreen extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      alert: undefined
    }
    this.props.navigation.setOptions({
      title: "Transactions",
      headerStyle: {
        backgroundColor: "green",
      },
      headerTitleStyle: {
        fontFamily: "Monaco",
        fontSize: normalize(15)
      },
      headerTintColor: "white"
    });
  }

  getTransactions() {
    const userId = this.props.route.params.user.id
    this.props.getUsersTransactions(userId, this.props.page).then(res => {
      if (res.error)
        setAlert(res)
      else {
        if (this.props.page === 1) {
          this.setState({
            transactions: res.success
          })
        }
        else {
          this.setState({
            transactions: [...this.state.transactions, ...res.success]
          })
        }
        this.props.updateState({
          refreshing: false,
          loadingNextItems: false,
          showEmptyView: !this.state.transactions
        })
      }
    })
  }

  componentDidMount() {
    this.getTransactions()
  }

  render() {
    const { alert, transactions } = this.state
    return (
      <View style={{
        flex: 1
      }}>
        {alert ? <AlertModal
          message={alert}
          onOkClicked={() => {
            this.setState({
              alert: alert
            })
          }}
        /> : null}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.props.latestTransactions}
          renderItem={({ item, index }) =>
            <TransactionsItem
              hideCustomer
              item={item}
            />
          }
          onRefresh={() => this.handleRefresh()}
          onEndReached={() => this.handleEndReached()}
          onEndReachedThreshold={0.5}
          refreshing={this.props.refreshing}
        />
      </View>
    );
  }

  handleRefresh = async () => {
    await this.props.updateState({
      page: 1,
      refreshing: true
    })
    this.getTransactions()
  }

  handleEndReached = async () => {
    if (!this.props.hasMoreItems) {
      return
    }
    await this.props.updateState({
      refreshing: false,
      loadingNextItems: true,
      page: this.props.page + 1,
    })
    this.getTransactions()
  }
}

function mapStateToProps(state) {
  return {
    Loading: state.LoadingReducer.loadingStatus,
  };
}

export default connect(
  mapStateToProps,
  { getUsersTransactions },
)(WrapperComponent(TransactionScreen, {
  title: "Transactions",
  empty_list_message: "No Transaction Found",
}));