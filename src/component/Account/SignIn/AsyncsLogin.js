import React, { useReducer, useMemo, useEffect } from 'react';
import { LoginReducer, initialState } from './reducer/LoginReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppNavigator from '../../../navigation/AppNavigation';
import VendorNavigation from '../../../navigation/VendorNavigation'
import bgSrc from "../SPASHSCREEN.gif";
import { Provider } from 'react-native-paper';

const Drawer = createDrawerNavigator();


const AsyncsLogin = () => {
    const [loginState, dispatch] = useReducer(LoginReducer, initialState)

    const authContext = useMemo(() => ({
        signIn: async (foundUser) => {

            const userToken = String(foundUser[0].userToken);
            console.log('USER TOKEN authContext ', userToken);

            const userName = foundUser[0].userName;
            console.log('USER NAME authContext ', userName);

            // const vendor = foundUser[0].response;
            // console.log('VENDOR authContext ', vendor);

            try {
                // const jsonValue = JSON.stringify(userToken)
                await AsyncStorage.setItem('userToken', userToken);
                console.log('userToken', userToken);



            } catch (error) {
                console.log(error);
            }
            dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'LOGOUT' });
        },
        // signUp: () => {

        // },

    }), []);

    useEffect(() => {
        setTimeout(async () => {
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                console.log('user token use effect', userToken);
            } catch (error) {
                console.log(error);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 3000);
    }, []);

    if (loginState.isLoading) {
        return (
            <Image style={styles.picture} source={bgSrc}>
            </Image>
        );
    }

    return (
        <Provider>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    {loginState.userToken !== null ? (
                        <Drawer.Navigator>

                            <Drawer.Screen name="HomeDrawer" component={VendorNavigation} />
                        </Drawer.Navigator>
                    ) :
                        <AppNavigator />
                    }
                </NavigationContainer>
            </AuthContext.Provider>
        </Provider>
    )
}

export default AsyncsLogin;

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    }
})