import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, FlatList } from 'react-native';
import WrapperComponent from '../WrapperComponent';
import { connect } from 'react-redux';
import { getUsersTransactions } from '../../redux/actions/TransactionActions'
import AlertModal from '../reusable_comp/AlertModal'
import { normalize } from '../../utils/Constants';

const getUserTransactions = async (props) => {
  const userId = props.route.params.user.id
  return await props.getUsersTransactions(userId, props.page)
}

const TransactionScreen = props => {

  props.navigation.setOptions({
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

  const [transactions, setTransactions] = useState([])
  const [alert, setAlert] = useState(undefined)

  useEffect(() => {
    getUserTransactions(props).then(res => {
      if (res.error)
        setAlert(res)
      else {
        setTransactions(res.success)
        props.updateState({
          refreshing: false,
          loadingNextItems: false,
          showEmptyView: !transactions
        })
      }
    })
  }, []);

  return (
    <View style={{
      flex: 1
    }}>
      {alert ? <AlertModal
        message={alert}
        onOkClicked={() => {
          setAlert(undefined)
        }}
      /> : null}
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={transactions}
        renderItem={({ item, index }) =>
          <TransactionsItem
            item={item}
          />
        }
        onRefresh={() => handleRefresh(props)}
        onEndReached={() => handleEndReached(props)}
        onEndReachedThreshold={0.5}
        refreshing={props.refreshing}
      />
    </View>
  );
};

const handleRefresh = async (props) => {
  await props.updateState({
    page: 1,
    refreshing: true
  })

  getUserTransactions(props).then(res => {
    if (res.error)
      setAlert(res)
    else {
      setTransactions(res.success)
      props.updateState({
        refreshing: false,
        loadingNextItems: false,
        showEmptyView: !transactions
      })
    }
  })
}

const handleEndReached = async (props) => {

  if (!props.hasMoreItems) {
    return
  }

  await props.updateState({
    refreshing: false,
    loadingNextItems: true,
    page: props.page + 1,
  })

  getUserTransactions(props).then(res => {
    if (res.error)
      setAlert(res)
    else {
      setTransactions([...transactions, ...res.success])
      props.updateState({
        refreshing: false,
        loadingNextItems: false,
        showEmptyView: !transactions
      })
    }
  })
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
