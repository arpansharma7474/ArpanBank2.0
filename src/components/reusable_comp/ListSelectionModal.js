import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';
import Modal from 'react-native-modal'
import { normalize } from '../../utils/Constants'

export default class CreatePostOptionModal extends Component {

    state = {
        optionsArray: this.props.optionsArray
    };

    render() {
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
                        borderRadius: 10,
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
                        >Options</Text>
                        <FlatList
                            style={{
                                height: 300,
                                width: "100%"
                            }}
                            data={this.props.optionsArray}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.onItemClicked(item)
                                    }}
                                    style={{
                                        width: "100%",
                                    }}>
                                    <Text style={{
                                        textAlign: "center",
                                        fontFamily: "Monaco",
                                        paddingVertical: 10,
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                        fontSize: normalize(15)
                                    }}>{item.title}</Text>
                                </TouchableOpacity>
                            }
                        />
                        <TouchableOpacity
                            onPress={() => this.props.onCancelClicked()}
                            style={{
                                width: "100%"
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
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View >
        );
    }
}
