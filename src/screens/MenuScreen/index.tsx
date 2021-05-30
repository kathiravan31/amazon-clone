import React from 'react'
import {View,Text,SafeAreaView,Pressable} from 'react-native'
import Button from '../../components/Button';
import {Auth} from 'aws-amplify'

const MenuScreen = () =>{
    const onLogout = () =>{
        Auth.signOut()
    }
    return(
        <SafeAreaView>
            <Button text="Sign Out " onPress={onLogout}/>
        </SafeAreaView>
    )
}

export default MenuScreen;