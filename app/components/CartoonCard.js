import {useEffect, useState} from 'react';

import { View, Text, Image } from 'react-native'

import CardRating from './CardRating';

const CartoonCard = ({navigation, ...props}) => {
    const cartoon = props.cartoon;

    // image aspect ratio is currently 2:3
    const imageAspectRatio = '2/3';

    return (
        <View className={`mx-2 flex flex-col`}>
            <Image src={cartoon.picture} style={{height:150, width:100}} className={`rounded-xl h-${props.cardHeight} w-full shrink`} onPress={props.onPress} resizeMode="contain"/>
            <CardRating avgRating={cartoon.avgrating} numRatings={cartoon.nrating}/>
        </View>
    )
}

export default CartoonCard;