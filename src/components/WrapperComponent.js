// import React from 'react';
// import {
//     SafeAreaView,
//     TouchableOpacity,
//     ActivityIndicator,
//     Keyboard
// } from 'react-native';
// import config from '../Utils/config'
// import { BackButton } from '../assets/Images'
// import { commonStyles } from '../Utils/CommonStyles'
// import EmptyView from './reusable_comp/EmptyView'
// import AlertModal from './reusable_comp/AlertModal'
// import LoadingModal from './reusable_comp/LoadingModal'
// import { StackActions, NavigationActions } from 'react-navigation';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { log } from '../Utils/Logger';

// /**
//  * A wrapper for the components with boiler plate for searching, Loading, pagination and swipe refresh
//  * https://medium.com/@soorajchandran/introduction-to-higher-order-components-hoc-in-react-383c9343a3aa 
//  */
// const WrapperComponent = (ChildComponent, props) =>
//     class extends React.Component {
//         static navigationOptions = ChildComponent.navigationOptions ? ChildComponent.navigationOptions : ({ navigation }) =>
//             props && props.title ? {
//                 title: props.title,
//                 headerStyle: {
//                     backgroundColor: config.colors.THEME_COLOR,
//                 },
//                 headerTitleStyle: {
//                     color: 'white',
//                     fontFamily: 'ProximaNova-Bold'
//                 },

//                 headerLeft: (
//                     <TouchableOpacity
//                         style={commonStyles.navigation_header_widget_style}
//                         onPress={() => navigation.goBack()}>
//                         <BackButton
//                             width={30}
//                             height={30}
//                         />

//                     </TouchableOpacity>
//                 ),
//                 headerRight: props.headerRight ? props.headerRight : undefined,
//             } : { header: null }
//         // common states


//         state = {
//             page: 1,
//             searchText: '',
//             refreshing: false,
//             loadingNextItems: false,
//             errorAlert: undefined,
//             showEmptyView: false
//         };

//         // search variblessss
//         checkingSearchText = false
//         currentSearchText = ''
//         hasMoreItems = true

//         render() {
//             return (
//                 <React.Fragment>
//                     <SafeAreaView style={{
//                         flex: 0,
//                         backgroundColor: config.colors.THEME_COLOR
//                     }} />
//                     <SafeAreaView style={{
//                         flex: 1,
//                         backgroundColor: 'white'
//                     }}>
//                         <ChildComponent
//                             {...this.props}
//                             {... this.state}
//                             checkSearchText={() => this.checkSearchText()}
//                             checkingSearchText={this.checkingSearchText}
//                             currentSearchText={this.currentSearchText}
//                             hasMoreItems={this.hasMoreItems}
//                             updateState={(obj) =>
//                                 new Promise((resolve, reject) => {
//                                     this.setState(obj, () => {
//                                         resolve("State Updated")
//                                     })
//                                 })
//                             }
//                             updateSearchCheck={(checkingSearchText) => {
//                                 this.checkingSearchText = checkingSearchText
//                             }}
//                             updateCurrentSearchText={(currentSearchText) => {
//                                 this.currentSearchText = currentSearchText
//                             }}
//                             updatehasMoreItems={(hasMoreItems) => {
//                                 this.hasMoreItems = hasMoreItems
//                             }}
//                         />

//                         {this.state.showEmptyView &&
//                             <EmptyView
//                                 message={(props && props.empty_list_message) ? props.empty_list_message : config.strings.error_no_items}
//                             />}
//                         {this.state.loadingNextItems &&
//                             <ActivityIndicator
//                                 style={{ backgroundColor: 'white' }}
//                                 size='large'
//                                 color={config.colors.THEME_COLOR}
//                                 animating={true}
//                             />
//                         }
//                         {this.state.errorAlert && this.state.errorAlert.error !== "Unauthenticated" &&
//                             <AlertModal
//                                 message={this.state.errorAlert}
//                                 onOkClicked={() => {
//                                     const error = this.state.errorAlert
//                                     this.setState({
//                                         errorAlert: undefined
//                                     }, () => {
//                                         if (error.resetToHome) {
//                                             const resetAction = StackActions.reset({
//                                                 index: 0,
//                                                 actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
//                                             });
//                                             this.props.navigation.dispatch(resetAction)
//                                         }
//                                         else if (error.success) {
//                                             this.props.navigation.goBack()
//                                         }
//                                     })
//                                 }}
//                             />}
//                         {this.props.Loading ? <LoadingModal /> : null}
//                     </SafeAreaView>
//                 </React.Fragment>
//             );
//         }

//         checkSearchText = () => {
//             return new Promise((resolve, reject) => {
//                 if (!this.checkingSearchText) {
//                     this.checkingSearchText = true
//                     setTimeout(() => {
//                         if (this.state.searchText === this.currentSearchText) {
//                             this.setState({
//                                 page: 1
//                             }, () => {
//                                 resolve("resolve")
//                             })
//                         }
//                         this.checkingSearchText = false
//                     }, 500)
//                 } else {
//                     reject("Checking")
//                 }
//             })
//         }
//     };

// export default WrapperComponent;