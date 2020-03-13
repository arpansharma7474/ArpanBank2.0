import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import config from '../../utils/config';
import Modal from 'react-native-modal'
import { normalize } from '../../utils/Constants';

class AlertModal extends Component {
    render() {
        const props = this.props
        return (
            <View style={{
                height: "100%",
                width: "100%",
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                opacity: 0.1,
            }}>
                <Modal
                    style={{
                        alignItems: "center"
                    }}
                    isVisible={true}>
                    <View style={{
                        width: "90%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        overflow: "hidden"
                    }}>
                        <Text
                            style={{
                                fontSize: normalize(15),
                                fontFamily: "Monaco",
                                backgroundColor: "green",
                                width: "100%",
                                color: 'white',
                                textAlign: "center",
                                padding: 10
                            }}
                        >{this.getTitle()}</Text>
                        <Text
                            style={{
                                marginTop: 10,
                                marginBottom: 20,
                                fontSize: normalize(13),
                                fontFamily: "Monaco",
                                width: "100%",
                                color: 'black',
                                textAlign: "center",
                                padding: 5
                            }}
                        >{this.getMessage()}</Text>
                    </View>
                    <View
                        style={{
                            width: "90%",
                            backgroundColor: 'green',
                            flexDirection: 'row',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            overflow: "hidden"
                        }}>
                        {props.onCancelClicked &&
                            <TouchableOpacity
                                onPress={() => {
                                    props.onCancelClicked()
                                }}
                                style={{
                                    flex: 1,
                                    alignItems: 'center'
                                }}>
                                <Text
                                    style={{
                                        fontSize: normalize(15),
                                        fontFamily: "Monaco",
                                        backgroundColor: "green",
                                        width: "100%",
                                        color: 'white',
                                        textAlign: "center",
                                        padding: 10
                                    }}
                                >Cancel</Text>
                            </TouchableOpacity>}
                        <TouchableOpacity
                            onPress={() => {
                                if (props.onOkClicked)
                                    props.onOkClicked()
                            }}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                borderStartColor: 'white',
                                borderStartWidth: props.onCancelClicked ? StyleSheet.hairlineWidth : 0
                            }}>
                            <Text
                                style={{
                                    fontSize: normalize(15),
                                    fontFamily: "Monaco",
                                    backgroundColor: "green",
                                    width: "100%",
                                    color: 'white',
                                    textAlign: "center",
                                    padding: 10
                                }}
                            >OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View >
        );
    }
    getMessage = () => {
        if (this.props.message?.error)
            return this.props.message.error.toString()
        if (this.props.message?.success)
            return this.props.message.success.toString()
        return "An Error has Occured"
    }

    getTitle = () => {
        return "Alert"
    }
}

export default AlertModal;