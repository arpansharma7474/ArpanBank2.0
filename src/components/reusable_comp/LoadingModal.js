import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import config from '../../utils/config';

class LoadingModal extends Component {

  render() {
    return (
      <View style={{
        height: "100%",
        width: "100%",
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'black',
          opacity: 0.3
        }} />
        <ActivityIndicator color={config.colors.THEME_COLOR} size="large" />
      </View>
    );
  }
}

export default LoadingModal;