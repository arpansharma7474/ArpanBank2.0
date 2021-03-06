
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    SplashScreen,
    LoginScreen,
    AdminScreen,
    UsersScreen,
    TransactionsScreen,
    AddTransactionScreen
} from '../components/screens'

export default Router = () => {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Admin" component={AdminScreen} />
                <Stack.Screen name="UsersScreen" component={UsersScreen} />
                <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
                <Stack.Screen name="AddTransactionScreen" component={AddTransactionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}