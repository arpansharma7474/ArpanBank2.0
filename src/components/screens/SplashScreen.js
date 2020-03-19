import React, { useEffect } from 'react'
import {
    ImageBackground,
    Platform
} from 'react-native'
import WrapperComponent from '../WrapperComponent'
import config from '../../utils/config'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import { log } from 'react-native-reanimated'
import User from '../../models/User'

const SplashScreen = props => {

    const user = new User(props.User)

    props.navigation.setOptions({
        headerShown: false
    });
    appOpenedNotification = false

    useEffect(() => {
        setTimeout(() => {
            if (!appOpenedNotification) {
                let routeName = ""
                if (user.name) {
                    if (user.isAdmin)
                        routeName = "Admin"
                    else
                        routeName = "Root"
                } else
                    routeName = "Login"
                props.navigation.reset({ index: 0, routes: [{ name: routeName }] })
            }
        }, 1000)
        setUpNotifications(props)
    }, []);

    return (
        <ImageBackground
            style={{
                height: config.constants.height,
                width: config.constants.width
            }}
            source={require("../../assets/ic_splash.png")}
        />
    )
}

const setUpNotifications = async (props) => {
    try {
        const token = await firebase.messaging().getToken()
        log('token', token);
        const hasPermission = await firebase.messaging().hasPermission()
        if (hasPermission) {
            setUpMessageListener(props);
        } else {
            const res = await firebase.messaging().requestPermission()
            setUpMessageListener(props);
        }
    } catch (err) {
        log(err, "Error")
    }
}

setUpMessageListener = async (props) => {
    const channelID = 'Ardor';
    if (Platform.OS === 'android') {
        // Create the channel
        const channel = new firebase.notifications.Android.Channel(
            channelID,
            'Ardor App',
            firebase.notifications.Android.Importance.Max,
        );
        await firebase.notifications().android.createChannel(channel);
    }

    firebase.notifications().onNotification(message => {
        const date = new Date().toString();
        log("Notification", message)
        const notification = new firebase.notifications.Notification({
            sound: 'default',
            priority: 'high',
            show_in_foreground: true,
        }).setNotificationId(date)
            .setTitle(message.title)
            .setBody(message.body)
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setChannelId(channelID)
            .android.setSmallIcon('ic_stat_ic_notification')
            .android.setColor("green");
        firebase.notifications().displayNotification(notification);
    });

    firebase.notifications().onNotificationOpened(notificationOpen => {
        appOpenedNotification = notificationOpen;
        if (appOpenedNotification) {
            const notification = notificationOpen.notification;
            handleNotification(notification, props);
        }
    });
    // when app is opened from a notification
    firebase.notifications().getInitialNotification().then(notificationOpen => {
        appOpenedNotification = notificationOpen
        if (appOpenedNotification) {
            const notification = notificationOpen.notification;
            this.handleNotification(notification, props);
        }
    });
}

handleNotification = (notification, props) => {
    firebase.notifications().removeAllDeliveredNotifications();
    const user = new User(props.User)
    if (user.name) {
        if (user.isAdmin)
            routeName = "Admin"
        else
            routeName = "UsersScreen"
    } else
        routeName = "Login"
    props.navigation.reset({ index: 0, routes: [{ name: routeName }] })
}

function mapStateToProps(state) {
    return {
        User: state.persistedReducer.userDetails
    };
}

export default connect(mapStateToProps, {})(WrapperComponent(SplashScreen))