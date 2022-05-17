import React from 'react';
import {useSelector} from 'react-redux';
import {tokenSelector} from '../slices/auth';

//Components and Screens
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const token = useSelector(tokenSelector);

  return (
    <NavigationContainer ref={navigationRef}>
      {token === undefined ? (
        <LoginScreen />
      ) : (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default NavigationScreen;
