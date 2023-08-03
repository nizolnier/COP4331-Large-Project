import { useEffect, useState } from 'react';

import { View, Text, Image } from 'react-native'

import CardRating from './CardRating';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartoonCard = ({ ...props }) => {
    const navigation = useNavigation();
    const cartoon = props.cartoon;

    // image aspect ratio is currently 2:3
    const imageAspectRatio = '2/3';

    const onPress = () => {
        console.log("Pressed")
        navigation.navigate("Reviews", { cartoon: props.cartoon._id })
    }

    return (
        <View className={`mx-2 flex flex-col`}>
            <TouchableOpacity onPress={onPress}>
                <Image src={cartoon.picture} style={{ height: 150, width: 100 }} className={`rounded-xl h-${props.cardHeight} w-full shrink`} resizeMode="contain" />
            </TouchableOpacity>
            <CardRating avgRating={cartoon.avgrating} numRatings={cartoon.nrating} />
        </View>
    )
}

export default CartoonCard;