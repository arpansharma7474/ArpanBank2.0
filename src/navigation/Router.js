import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SplashScreen,
  LoginScreen,
  AdminScreen,
  UsersScreen,
  TransactionsScreen,
  AddTransactionScreen,
} from '../components/screens';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator initialRouteName="Generate Paid Request">
      <Drawer.Screen name="Add Money" component={AddTransactionScreen} />
      <Drawer.Screen name="Generate Paid Request" component={UsersScreen} />
      <Drawer.Screen name="Logout" component={UsersScreen} />
    </Drawer.Navigator>
  );
};

export default Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="UsersScreen" component={UsersScreen} />
        <Stack.Screen
          name="TransactionsScreen"
          component={TransactionsScreen}
        />
        <Stack.Screen
          name="AddTransactionScreen"
          component={AddTransactionScreen}
        />
        <Stack.Screen
          name="Root"
          component={Root}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
