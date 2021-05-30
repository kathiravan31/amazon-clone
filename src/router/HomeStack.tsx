import React from 'react'
import {SafeAreaView, Text, TextInput, View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen/index'
import Feather from 'react-native-vector-icons/Feather'
import { useState } from 'react'


const Stack = createStackNavigator();

interface HeaderComponentProps{
    searchValue:String;
    setSearchValue:()=>void;
}

const HeaderComponent = ({searchValue,setSearchValue}:HeaderComponentProps) =>{
    return(
        <SafeAreaView style={{backgroundColor:'#22e3dd'}}>
            <View style={{backgroundColor:'white',margin:10,padding:5,flexDirection:'row',alignItems:'center'}}>
                <Feather name="search" size={20}/>
                <TextInput style={{height:40,marginLeft:10}} placeholder="Search..." value={searchValue} onChangeText={setSearchValue}/>
            </View>

        </SafeAreaView>
    )
}

function HomeStack() {

    const [searchValue,setSearchValue] = useState('')
    return (
        
        <Stack.Navigator screenOptions={{
            header:()=> <HeaderComponent searchValue={searchValue} setSearchValue={setSearchValue}/>
        }}>
            
            <Stack.Screen name="HomeScreen" options={{title:'Home'}}> 
                {()=> <HomeScreen searchValue={searchValue}/>}
            </Stack.Screen>
            <Stack.Screen name="ProductDetails" component={ProductScreen}/>
            
        </Stack.Navigator>
    )
}

export default HomeStack
