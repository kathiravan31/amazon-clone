import React from 'react'
// import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
// import ShoppingCartScreen from '../screens/ShoppingCartScreen/index'
import ShoppingCartStack from './ShoppingCartStack'
import MenuScreen from '../screens/MenuScreen'
import Entypo from 'react-native-vector-icons/Entypo'
import HomeStack from './HomeStack'


const Tap = createBottomTabNavigator();

function BottomTapNav() {
    return (

        <Tap.Navigator tabBarOptions={{showLabel:false,inactiveTintColor:'#e47911',activeTintColor:'#ffbd7d'}}>
            <Tap.Screen 
            name="Home" 
            component={HomeStack}
            options={{
                tabBarIcon:({color})=>(
                    <Entypo name="home" color={color} size={18}/>
                )
            }}
            />
            <Tap.Screen name="Profile"
             component={HomeScreen}
             options={{
                tabBarIcon:({color})=>(
                    <Entypo name="user" color={color} size={18}/>
                )
            }}
             />
            <Tap.Screen 
            name="Cart" 
            component={ShoppingCartStack}
            options={{
                tabBarIcon:({color})=>(
                    <Entypo name="shopping-cart" color={color} size={18}/>
                )
            }}
            />
            <Tap.Screen 
            name="More" 
            component={MenuScreen}
            options={{
                tabBarIcon:({color})=>(
                    <Entypo name="menu" color={color} size={18}/>
                )
            }}
            />
        </Tap.Navigator>

    )
}

export default BottomTapNav
