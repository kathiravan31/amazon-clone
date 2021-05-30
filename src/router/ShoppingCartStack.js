import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ShoppingCartScreen from '../screens/ShoppingCartScreen/index'
import AddressScreen from '../screens/AddressScreen/index'


const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Cart" 
            component={ShoppingCartScreen}
            options={{title:'Shopping Cart'}}
            />
            <Stack.Screen 
            name="Address" 
            component={AddressScreen}
            options={{title:'Address'}}
            />
            
        </Stack.Navigator>
    )
}

export default HomeStack
