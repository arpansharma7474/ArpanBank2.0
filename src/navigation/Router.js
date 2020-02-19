
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    SplashScreen,
    LoginScreen,
    AdminScreen,
    UsersScreen
} from '../components/screens'

export default Router = () => {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Admin" component={AdminScreen} />
                <Stack.Screen name="UsersScreen" component={UsersScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}