import React, { useState,useEffect } from 'react'
import {View,Text,TextInput,Alert,ScrollView,KeyboardAvoidingView,Platform} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './Styles'
import CountryList from 'country-list'
import Button from '../../components/Button'

import {Auth, DataStore, API, graphqlOperation} from 'aws-amplify'
import {Order,OrderProduct,CartProduct} from '../../models'
import {createPaymentIntent} from '../../graphql/mutations'
import {useStripe,presentPaymentSheet} from '@stripe/stripe-react-native'


const countries = CountryList.getData()

function AddressScreen() {

    const [country,setCountry] = useState(countries[0].code);

    const [fullname,setFullname] = useState('');
    const [number,setNumber] = useState('');
    const [address,setAddress] = useState('');
    const [addressError,setaddressError] = useState('Invalid Address');
    const [city,setCity] = useState('');

    const [clientSecret,setClientSecret] = useState<string | null>(null)

    const {initPaymentSheet} = useStripe();
    const navigation = useNavigation();
    const route = useRoute();
    const amount =Math.floor(route.params?.totalPrice * 100 || 0);
    const description = 'software service'

    useEffect(()=>{
        fetchPaymentIntent();
    },[])

    useEffect(()=>{
        if(clientSecret){
            initializePaymentSheet();
        }
    },[clientSecret])
    const fetchPaymentIntent = async () =>{
        const response = await API.graphql(
            graphqlOperation(createPaymentIntent,{amount})
        )

        console.log(response)
        setClientSecret(response.data.createPaymentIntent.clientSecret)
    }

    const initializePaymentSheet = async () =>{
        if(!clientSecret){
            return;
        }
        const {error} = await initPaymentSheet({
            paymenIntentClientSecret:clientSecret,
        })

        console.log("success")

        if(error){
            Alert.alert(error)
        }
    }
    
    const openPaymentSheet = async () =>{
        if(!clientSecret){
            return;
        }
        const {error} = await presentPaymentSheet({clientSecret});

        if(error){
            Alert.alert(`Error code: ${error.code}`,error.message);
        }else{
            saveOrder();
            Alert.alert(`Success, Your order is Confirmed`)
        }

        
        
    }

    const saveOrder = async () => {
        console.log('saveorder1')
        // get user details
        const userData = await Auth.currentAuthenticatedUser();
        // create a new order
        console.log('saveorder2')

        const newOrder = await DataStore.save(
          new Order({
            userSub: userData.attributes.sub,
            fullName: fullname,
            phoneNumber: number,
            country,
            city,
            address,
          }),
        );

        console.log('saveorder3')
    
        // fetch all cart items
        const cartItems = await DataStore.query(CartProduct, cp =>
          cp.userSub('eq', userData.attributes.sub),
        );

        console.log('saveorder4')
    
        // attach all cart items to the order
        await Promise.all(
          cartItems.map(cartItem =>
            DataStore.save(
              new OrderProduct({
                quantity: cartItem.quantity,
                option: cartItem.option,
                productID: cartItem.productID,
                orderID: newOrder.id,
              }),
            ),
          ),
        );

        console.log('saveorder5')
    
        // delete all cart items
        await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));

        console.log('saveorder6')
    
        // redirect home
        navigation.navigate('Home');
    };

    const onCheckOut = () =>{
        if(!!addressError){
            Alert.alert('fix all fields error before submiting');
            return;
        }
        if(!fullname){
            Alert.alert('Please fill in the fullname field');
            return;
        }

        if(!number){
            Alert.alert('Please fill in the Number field');
            return;
        }

        openPaymentSheet();
    }

    const validateAddress = () =>{
        if(address.length < 3){
            setAddress("Address is too short")
        };
        if(address.length < 10){
            setAddress("Address is too long")
        }
    }

    return (
        <KeyboardAvoidingView behaviour={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.OS === 'ios' ?  150 : 0}
        >
            <ScrollView style={styles.root}>
                <View style={styles.row}>
                    <Picker
                    selectedValue={country}
                    onValueChange={setCountry}
                    >
                        {countries.map((country)=>(
                            <Picker.Item value={country.code} label={country.name}/>
                        ))}
                    </Picker>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Full Name (first and Last name)</Text>
                    <TextInput style={styles.input} placeholder="Full name" value={fullname} onChangeText={setFullname}/>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} keyboardType={'phone-pad'} placeholder="Phone number" value={number} onChangeText={setNumber}/>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput style={styles.input} placeholder="Address" value={address} onEndEditing={validateAddress} onChangeText={(text)=>{setAddress(text);setaddressError('')}}/>
                    {!!addressError && <Text style={styles.errorLabel}>{addressError}</Text>}
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>City</Text>
                    <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity}/>
                </View>
                
                <View style={{paddingVertical:10}}>
                    <Button text='Checkout' onPress={onCheckOut}/>   
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    )
}

export default AddressScreen
