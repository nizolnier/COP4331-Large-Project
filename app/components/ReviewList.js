import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Button, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import Rating from './Rating.js';

const ReviewCard = (props) => {
    const review = props.review;

    // change this to change image size
    const imageWidth = 12;
    // image aspect ratio is currently 2:3
    // we'll also need to change this to user picture i think
    const imageAspectRatio = '2/3';

    return (
        <View className={`my-2 w-full flex flex-row bg-[#E9A6A60D] rounded-xl p-4`}>
            <Image src={review.show.picture} className={`rounded-xl h-auto w-${imageWidth} aspect-[${imageAspectRatio}]`} onPress={props.onPress} resizeMode="contain"/>
            <View className={`flex flex-col pl-2 shrink`}>
                <Text className="text-white font-bold">{review.show.title}</Text>
                <View className={"flex flex-row"}>
                    <Text className="text-gray-500 pr-2">Review by <Text className="text-rose-300">{review.username}</Text></Text>
                    <Rating rating={review.stars}/>
                </View>
                <Text className="text-gray-600 text-sm">{review.dateWatched ? "Watched on " + (new Date(review.dateWatched)).toDateString() : ''}</Text>
                <Text className={`text-white pt-2`}>{review.comment}</Text>
            </View>
        </View>
    )
}

const ReviewList = (props) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        if (selected) props.navigation.navigate("review")
    }, [selected])

    const Reviews = () => {
        return props.reviews.map((review, i) => <ReviewCard
            review={review}
            key={review._id}
            onPress={() => setSelected(item)}
        />)
    }
    
    const Header = () => {
        return <View className="mb-2">
            <Text className="text-white pb-4 font-bold">{props.title}</Text>
            <Button title={`Sort ${props.sortType == 'ascending' ? 'descending' : 'ascending'}`} className="bg-rose-300 text-gray-600" onPress={() => props.setSortType(props.sortType == 'ascending' ? 'descending' : 'ascending')}></Button>
        </View>
    }

    return (
        <SafeAreaView className={"flex flex-1"}>
            <Header/>
            {props.isLoadingReviews ? <ActivityIndicator/> : 
            <View className="flex flex-col">
                <Reviews/>
            </View>}
        </SafeAreaView>
    )
}

export default ReviewList;