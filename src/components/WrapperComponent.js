import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import config from '../utils/config'
import EmptyView from './reusable_comp/EmptyView'
import LoadingModal from './reusable_comp/LoadingModal'

/**
 * A wrapper for the components with boiler plate for searching, Loading, pagination and swipe refresh
 * https://medium.com/@soorajchandran/introduction-to-higher-order-components-hoc-in-react-383c9343a3aa 
 */
const WrapperComponent = (ChildComponent, props) =>
    class extends React.Component {


        state = {
            page: 1,
            refreshing: false,
            loadingNextItems: false,
            alertObj: undefined,
            showEmptyView: false
        };
        hasMoreItems = true

        render() {
            return (
                <React.Fragment>
                    <SafeAreaView style={{
                        flex: 0,
                        backgroundColor: config.colors.THEME_COLOR
                    }} />
                    <SafeAreaView style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}>
                        <ChildComponent
                            {...this.props}
                            {... this.state}
                            hasMoreItems={this.hasMoreItems}
                            updateState={(obj) =>
                                new Promise((resolve, reject) => {
                                    this.setState(obj, () => {
                                        resolve("State Updated")
                                    })
                                })
                            }
                            updatehasMoreItems={(hasMoreItems) => {
                                this.hasMoreItems = hasMoreItems
                            }}
                        />

                        {this.state.showEmptyView &&
                            <EmptyView
                                message={(props && props.empty_list_message) ? props.empty_list_message : config.strings.error_no_items}
                            />}
                        {this.state.loadingNextItems &&
                            <ActivityIndicator
                                style={{ backgroundColor: 'white' }}
                                size='large'
                                color={config.colors.THEME_COLOR}
                                animating={true}
                            />
                        }
                        {this.props.Loading ? <LoadingModal /> : null}
                    </SafeAreaView>
                </React.Fragment>
            );
        }
    };

export default WrapperComponent;