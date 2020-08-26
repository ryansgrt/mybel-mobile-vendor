import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Units from '../component/details/screen/Units'
import Profile from '../component/profile/screen/Profile'
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DesignInterior from '../component/details/screen/DesignInterior'

const TopNavigation = createMaterialTopTabNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const VendorContainer = () => {
    return (

        <Tab.Navigator activeColor='yellow' initialRouteName='Profile'>
            <Tab.Screen
                name="Home"
                component={DetailTopScreen}
                options={{
                    tabBarLabel: 'Home',

                    tabBarIcon: ({ color }) => <Ionicons name="ios-home" size={24} color={color} />
                }}

            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Account',

                    tabBarIcon: ({ color }) => <Ionicons name="ios-person" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    )
}

export default VendorContainer;

const DetailTopScreen = ({ navigation }) => (
    <TopNavigation.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#296dff',

            height: 60
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }} initialRouteName="Product">
        <TopNavigation.Screen name="Product" component={Units} options={{
            title: 'Product',
            headerTitleAlign: 'center'
        }} />
        <TopNavigation.Screen name="Category" component={DesignInterior} options={{
            title: 'Design Interior',
            headerTitleAlign: 'center'
        }} />
    </TopNavigation.Navigator>

    //     <DetailStack.Navigator screenOptions={{
    //         headerStyle: {
    //             backgroundColor: '#296dff',

    //             height: 60
    //         },
    //         headerTintColor: '#fff',
    //         headerTitleStyle: {
    //             fontWeight: 'bold'
    //         }
    //     }}>
    //         <DetailStack.Screen name="Home" component={Units} options={{
    //             title: 'Product',
    //             headerTitleAlign: 'center'
    //         }} />
    //     </DetailStack.Navigator>
    // );
)

const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#296dff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name="Profile" component={Profile} options={{
            title: 'Profile',
            headerLeft: () => (
                <View style={{ marginLeft: 10, width: 60 }}>
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#296dff" onPress={() => navigation.openDrawer()}></Icon.Button>
                </View>
            )
        }} />
    </ProfileStack.Navigator>
)
