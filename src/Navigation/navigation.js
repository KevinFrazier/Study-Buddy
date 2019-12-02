import React from 'react'
import {createAppContainer, createSwitchNavigator}  from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { createDrawerNavigator , DrawerNavigatorItems} from 'react-navigation-drawer';

import { Button, Platform, View, SafeAreaView } from 'react-native';
import * as authActions from '../authentication/store/Action/auth'
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors'


import AuthenticationMenu from '../authentication/AuthenticationMenu'
import SignUp from '../authentication/User/SignUpScreen'
import Login from '../authentication/User/LoginScreen'

import MainScreen from '../components/MainScreen'
import Feed from '../components/Feed'
import myMap from '../components/myMap'
// import UserInfo from '../components/UserInfo'


import UserWorkspacesScreen from '../Screens/WorkSpace/user/UserWorspacesScreen2v'
// import UserEditWorkspaceScreen from '../Screens/WorkSpace/user/EdithWorkspaceScreen'
import IndividualWorkspaceScreen from '../Screens/WorkSpace/WorkspaceScreen'

import UserEditWorkspaceScreen from '../Screens/WorkSpace/user/EdithWorkspaceScreen'
// import IndividualWorkspaceScreen from '../Screens/WorkSpace/user/UserWorspacesScreen2v'


const WorkSpacesNavigator = createStackNavigator(
    {
        UserWorkSpacesCategories: UserWorkspacesScreen,
        // WorkSpace: IndividualWorkspaceScreen,
        UserEditWorkspaceScreen :UserEditWorkspaceScreen,
    }, {
        defaultNavigationOptions: {
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? Colors.workSpaceNavigationPrimaryColor : ''
            },
            headerTintColor:
              Platform.OS === 'android' ? 'white' : Colors.workSpaceNavigationPrimaryColor,
          }
    }
);

const Drawer = createDrawerNavigator(
    {
        FeedRoute: Feed, 
        MapRoute: myMap,
        MainScreenDrawer: MainScreen,
        WorkspacesDrawer : WorkSpacesNavigator
    },
    {
        initialRouteName: 'MainScreenDrawer',
        drawerPosition: 'right',
        drawerBackgroundColor: Colors.drawerNavigatorBackgroundColor,
        contentOptions: {
            labelStyle: {
              color: 'white',
            },
            activeBackgroundColor: Colors.drawerNavigatorActivationColor,
        },
        contentComponent: props => {
            const dispatch = useDispatch()
            return (
              <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView forceInset={{ bottom: 'always', horizontal: 'never' }}>
                  <DrawerNavigatorItems {...props} />
                  <Button
                    title="Logout"
                    color={Colors.drawerNavigatorTextColor}
                    onPress={() => {
                        dispatch(authActions.logout())
                        props.navigation.navigate('AuthenticationMenu')
                    
                    }}
                  />
                </SafeAreaView>
              </View>
            );
          }
    },
)

const Authentication = createStackNavigator(
    {
        AuthenticationMenu: AuthenticationMenu,
        SignUp: SignUp,
        Login:Login
    },
    {
        defaultNavigationOptions: {
            headerTitle: 'Studdy Buddy'
        }
    }
)

const MainNavigator = createSwitchNavigator({
    // UserWorkspacesDrawer : UserWorkspacesScreen, // remove when finish editing workpsaces
    Auth: Authentication,
    DrawerNavigation: Drawer,
    
})


export default createAppContainer(MainNavigator)