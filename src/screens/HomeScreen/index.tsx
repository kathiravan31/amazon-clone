import React, { Component,useState,useEffect } from 'react'
import {View,Text,StyleSheet,Image,FlatList} from 'react-native'
import Fontawesome from 'react-native-vector-icons/FontAwesome'
import ProductItem from '../../components/ProductItem/index'
// import products from '../../data/products'
import {DataStore} from 'aws-amplify'
import {Product} from '../../models/'


const HomeScreen = ({searchValue}:{searchValue: string}) => {
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(() => {
        DataStore.query(Product).then(setProducts);
    }, [])
    console.log(searchValue)
    return (
        <View style={styles.page}>
            <FlatList
                data={products}
                renderItem={({item})=> <ProductItem item={item}/>}
                // keyExtractor={({id})=>id}
                showsVerticalScrollIndicator={false}
            />       
        </View>
    ) 
}

const styles = StyleSheet.create({
    page:{
        padding:10
    },
})

export default HomeScreen