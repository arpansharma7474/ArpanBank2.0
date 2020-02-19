import React, {useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import WrapperComponent from '../WrapperComponent';
import {connect} from 'react-redux';

const TransactionScreen = props => {
  useEffect(() => {

  }, []);

  return (
    <View style={{
        flex:1
    }}>
        <Text>Transaction Screen</Text>
    </View>
  );
};



const styles = StyleSheet.create({
 
});

function mapStateToProps(state) {
  return {
    Loading: state.LoadingReducer.loadingStatus,
  };
}

export default connect(
  mapStateToProps,
  {},
)(WrapperComponent(TransactionScreen));
