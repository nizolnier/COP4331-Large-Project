
import Svg, { Path } from 'react-native-svg';
import * as React from 'react'
import { View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native';

const CardRating = ({avgRating, numRatings}) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("Reviews")
    }

    return (
        <View className="flex flex-row items-center p-1">
            <Svg className="w-4 h-4 text-red-600 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/Svg" fill="currentColor" viewBox="0 0 22 20">
                <Path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </Svg>
            <Text className=" text-xs font-bold text-gray-400 dark:text-white">{avgRating}</Text>
            <Text className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></Text>
            <Text onPress={onPress} className="text-xs font-medium text-gray-400 underline hover:no-underline dark:text-white">{numRatings} reviews</Text>
        </View>
    )
}

export default CardRating;