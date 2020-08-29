import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';

import { HomeScreen } from '../Screens/HomeScreen';
import { SettingsScreen } from '../Screens/SettingsScreen';
import { LoginScreen } from '../Screens/LoginScreen'
import {ServerDetails} from '../Screens/ServerDetails'
import AuthContext from '../Hooks/AuthContext'
import { SafeAreaView } from 'react-native';

const TabNavigator = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();
const LoginStackNavigator = createStackNavigator()


const HomeStackScreen = () => {
    return (
        <HomeStackNavigator.Navigator headerMode={"none"}>
            <HomeStackNavigator.Screen
                name="Home"
                component={HomeScreen}
            />
            <HomeStackNavigator.Screen
                name="Details"
                component={ServerDetails}
            />
        </HomeStackNavigator.Navigator>
    );
}
const SettingsStackScreen = () => {
    return (
        <SettingsStackNavigator.Navigator headerMode={"none"}>
            <SettingsStackNavigator.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </SettingsStackNavigator.Navigator>
    );
}

const LoginStackScreen = () => {
    return (
        <LoginStackNavigator.Navigator>
            <LoginStackNavigator.Screen name='Login' component={LoginScreen} />
        </LoginStackNavigator.Navigator>
    )
}

const BottomTabBar = ({ navigation, state }) => (
    <SafeAreaView>


    <BottomNavigation
        selectedIndex={state.index}
        onSelect= {index => navigation.navigate(state.routeNames[index])}
        >
        <BottomNavigationTab title='Home' icon={props => <Icon {...props} name='home-outline'/>} />
        <BottomNavigationTab title='Settings' icon={props => <Icon {...props} name='settings-outline'/>}/>
    
    </BottomNavigation>
    </SafeAreaView>
)

const BottomTabNavigatior = ({ state }) => {
    return (
        <TabNavigator.Navigator tabBar={props => <BottomTabBar {...props} />}>
            <TabNavigator.Screen name='Home' component={HomeStackScreen} />
            <TabNavigator.Screen name='Settings' component={SettingsScreen}/>
        </TabNavigator.Navigator>
    )
}

export const AppNavigator = () => {
    const auth = React.useContext(AuthContext)
    return (
        <NavigationContainer>
            {auth.apiKey == null ? (
                <LoginStackScreen />
            ) : (
                    <BottomTabNavigatior />
                )}
        </NavigationContainer>
    )

}


