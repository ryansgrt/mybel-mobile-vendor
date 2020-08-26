import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../component/Account/HomeScreen'
import SignInScreen from '../component/Account/SignInScreen'
import SignUpScreen from '../component/Account/SignUpScreen'
// import SplashScreen from '../component/Account/SplashScreen'
import VendorNavigation from './VendorNavigation'

const Stack = createStackNavigator();


const AppNavigation = ({ navigation }) => (

    <Stack.Navigator>
        <Stack.Screen
            name="Welcome"
            component={HomeScreen}
            options={{
                headerShown: false,
                title: "Welcome",
                headerStyle: {
                    backgroundColor: 'skyblue'
                },
                headerTintColor: '#fff'
            }}

        />
        <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
                headerShown: false,
                title: "Sign In",
                headerStyle: {
                    backgroundColor: 'skyblue'
                },
                headerTintColor: '#fff'
            }}
        />
        <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
                headerShown: false,
                title: 'Sign Up',
                headerStyle: {
                    backgroundColor: 'skyblue'
                },
                headerTintColor: '#fff'
            }}
        />
        <Stack.Screen
            name="Details"
            component={VendorNavigation}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>

)
export default AppNavigation;