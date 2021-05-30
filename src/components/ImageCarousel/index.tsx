import React, { useState,useCallback } from 'react'
import {View,Text,FlatList,Image,StyleSheet,useWindowDimensions} from 'react-native'
// import styles from '../ProductItem/Styles'

const ImageCarousel = ({images}:{images:string[]}) => {
    const windowWidth = useWindowDimensions().width;
    const [activeIndex,setActiveIndex] = useState(1)

    const flatlistupdate = useCallback(({viewableItems})=>{
        if(viewableItems.length > 0){
            setActiveIndex(viewableItems[0].index || 0)
        }
        console.log(viewableItems[0].index)

    },[]);
    return (
        <View style={styles.root}>
            <FlatList
            data={images}
            renderItem={({item}) =>(
                <Image style={[styles.image,{width:windowWidth - 40}]} source={{uri:item}}/>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={windowWidth - 40}
            snapToAlignment={'center'}
            decelerationRate={'fast'}
            viewabilityConfig={{
                viewAreaCoveragePercentThreshold:50,
                // minimumViewTime:300
            }}

            onViewableItemsChanged={flatlistupdate}
            />

            <View style={styles.dots}>
                {images.map((image,index)=>(
                    <View style={[styles.dot,{
                        backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed'
                    }]}/>
                ))}
            </View>

            
            
        </View>
    )
}

const styles = StyleSheet.create({
    root:{

    },
    image:{
        margin:10,
        height:250,
        resizeMode:'contain'
    },
    dots:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    dot:{
        width:10,
        height:10,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#c9c9c9',
        backgroundColor:'#ededed',
        margin:5
    }
})

export default ImageCarousel
