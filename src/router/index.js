import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import BottomTapNav from './bottomTabNav'

const Root = createStackNavigator();

function Router() {
    return (
       <NavigationContainer>
           <Root.Navigator screenOptions={{headerShown:false}}>
               <Root.Screen name="HomeTabs" component={BottomTapNav}/>
           </Root.Navigator>
       </NavigationContainer>
    )
}

export default Router
