import React,{useState} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import Fontawesome from 'react-native-vector-icons/FontAwesome'
import styles from './Styles'
import QuantitySelector from '../Quantity'

import {DataStore} from 'aws-amplify';
import {CartProduct} from '../../models';

interface CartProductItemProps{
    cartItem:CartProduct
}

const CartProductItem = ({cartItem}:CartProductItemProps) => {

    const {product, ...cartProduct} = cartItem

    // const [quantity,setQuantity] = useState(quantityProp)

    const updateQuantity = async (newQuantity: number) => {
        const original = await DataStore.query(CartProduct, cartProduct.id);
    
        await DataStore.save(
          CartProduct.copyOf(original, updated => {
            updated.quantity = newQuantity;
          }),
        );
      };
    
    return (
        <View style={styles.root}>
            <View style={styles.row}>
                <Image style={styles.image} source={{uri:product.image}}/>

                <View style={styles.rightContainer}>
                    <Text style={styles.title} numberOfLines={3}>{product.title}</Text>
                    {/* rating */}
                    <View style={styles.ratingContainer}>
                        { [0,0,0,0,0].map((el,i)=>(
                        <Fontawesome 
                        key={`${product.id}-${i}`}
                        style={styles.star} 
                        name={i < Math.floor(product.avgRating) ? 'star' : 'star-o'} 
                        size={18} 
                        color={"#e47911"}
                        />

                        ))
                        }

                        <Text>{product.ratings}</Text>
                    </View>
                    <Text style={styles.price}>from ${product.price} {product.oldPrice && (<Text style={styles.oldPrice}>${product.oldPrice}</Text>)}</Text>
                </View>

            </View>

            <View style={styles.quantityContainer}>
                <QuantitySelector quantity={cartProduct.quantity} setQuantity={updateQuantity}/>
            </View>

        </View>
    )
}



export default CartProductItem
