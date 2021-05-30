import React, { useState,useEffect } from 'react'
import {View,Text,ScrollView,ActivityIndicator} from 'react-native'
import styles from './styles'
import product from '../../data/product'
import {Picker} from '@react-native-picker/picker'
import {useRoute,useNavigation} from '@react-navigation/native'
import QuantitySelector from '../../components/Quantity/index'
import Button from '../../components/Button'
import ImageCarousel from '../../components/ImageCarousel'
import {DataStore,Auth} from 'aws-amplify'
import {Product,CartProduct} from '../../models'

const  ProductScreen = () => {
    const [selectedOption,setSelectedOption] = useState<string | undefined>(undefined)
    const [quantity,setquantity] = useState(1)
    const [product,setProduct] = useState<Product | undefined>(undefined);


    const route = useRoute();
    const navigation = useNavigation();
    console.log(route.params)

    useEffect(()=>{
        if(!route.params?.id){
            console.log(route.params.id,' ll')
            return;
        }
        DataStore.query(Product,route.params.id).then(res=>{
            console.log(res)
            setProduct(res)
        })
    },[route.params?.id])

    useEffect(() => {
        if(product?.options){
            setSelectedOption(product.options[0])
        }
    }, [product])
    console.log(selectedOption)

    const onAddToCart = async () =>{
        const userData = await Auth.currentAuthenticatedUser();

        if(!product || !userData){
            return
        }
        const newCartParoduct = new CartProduct({
            userSub : userData.attributes.sub,
            quantity,
            option : selectedOption,
            productID : product.id,
        })

        await DataStore.save(newCartParoduct)

        navigation.navigate('Cart')
    }

    if(!product){
        return <ActivityIndicator/>
    }

    return (
        <ScrollView style={styles.root}>
            <Text style={styles.title}>{product.title}</Text>

            <ImageCarousel images={product.images}/>
            
            <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue)=>{setSelectedOption(itemValue)}}
            >
                
                {product.options.map(option =>(<Picker.Item label={option} value={option}/>))}
                
            </Picker>
            <Text style={styles.price}>from ${product.price.toFixed(2)} {product.oldPrice && (<Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>)}</Text>

            <Text style={styles.description}>
                {product.description}
            </Text>

            <QuantitySelector quantity={quantity} setQuantity={setquantity}/>

            <View style={{paddingTop:10,paddingBottom:10}}>
                <Button text={'Add To Cart'} onPress={onAddToCart} containerStyles={{backgroundColor:'#e3c905'}}/>
                <Button text={'Buy Now'} onPress={()=>{console.warn('Buy Now')}}/>
            </View>

        </ScrollView>
    )
}

export default ProductScreen
