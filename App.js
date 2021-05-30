import React,{Component} from 'react'
import {View,Text,TextInput,ScrollView,StyleSheet,StatusBar,SafeAreaView} from 'react-native'
import 'react-native-gesture-handler';
import Router from './src/router/index';

import AddressScreen from './src/screens/AddressScreen'
import HomeScreen from './src/screens/HomeScreen/index'
import ProductScreen from './src/screens/ProductScreen'
import ShoppingCartScreen from './src/screens/ShoppingCartScreen'

import {StripeProvider} from '@stripe/stripe-react-native'

import Amplify from 'aws-amplify'
import {withAuthenticator} from 'aws-amplify-react-native'

class App extends Component{
  render(){
    return(
      <>
      <View style={{flex:1}}>
        <StatusBar barStyle='dark-content'/>
          <StripeProvider publishableKey="pk_test_51IwRCWSI6Fv9GtSrXP3ikFUqssbQt7W40SZ4SG62QadviCPC6EghVW2PVkvJ6U1DyquLLfetrWywqaAepsQwXnVM00a5omelta">
            <Router/>
          </StripeProvider>
      </View>
      </>
    )
  }
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'purple',
    alignItems:'center',
    justifyContent:'center'
  }
})