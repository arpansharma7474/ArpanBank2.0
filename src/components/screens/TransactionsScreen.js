import React from 'react';
import {
  View,
  FlatList
} from 'react-native';
import WrapperComponent from '../WrapperComponent';
import { connect } from 'react-redux';
import { getUsersTransactions } from '../../redux/actions/TransactionActions'
import { showAlert } from '../../utils/AlertHelper'
import { normalize } from '../../utils/Constants';
import { log } from '../../utils/Logger';

class TransactionScreen extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
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

  getTransactions = async () => {
    const userId = this.props.route.params.user.id
    const res = await this.props.getUsersTransactions(userId, this.props.page)
    if (res.error)
      showAlert(res.error)
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
    }
    this.props.updatehasMoreItems(res.success.length === 10)
    await this.props.updateState({
      refreshing: false,
      loadingNextItems: false,
      showEmptyView: !this.state.transactions,
    })
  }

  componentDidMount() {
    this.getTransactions()
  }

  render() {
    const { transactions } = this.state
    return (
      <View style={{
        flex: 1
      }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={transactions}
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
    if (this.props.hasMoreItems && !this.props.loadingNextItems) {
      await this.props.updateState({
        refreshing: false,
        loadingNextItems: true,
        page: this.props.page + 1,
      })
      this.getTransactions()
    }
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
