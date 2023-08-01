import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const sampleCartoon = {
    "_id": "64a7437b62d4733a9c26c60e",
    "title": "Spongebob Squarepants",
    "picture": "https://nick.mtvnimages.com/uri/mgid:arc:content:nick.com:9cd2df6e-63c7-43da-8bde-8d77af9169c7?quality=0.7",
    "director": "Stephen Hillenburg",
    "genre": [
        "Comedy",
        "Family"
    ],
    "year": 1999,
    "nrating": 0,
    "trating": 0,
    "avgrating": 0,
    "nfavorites": 0,
    "description": "A square yellow sponge named SpongeBob SquarePants lives in a pineapple with his pet snail, Gary, in the city of Bikini Bottom on the floor of the Pacific Ocean."
}

import Rating from './Rating.js';

const ReviewCard = (props) => {
    const review = props.review;
    const user = props.user;
    const cartoon = props.cartoon;

    // change this to change image size
    const imageWidth = 12;
    // image aspect ratio is currently 2:3
    // we'll also need to change this to user picture i think
    const imageAspectRatio = '2/3';

    return (
        <View className={`my-2 w-full flex flex-row bg-[#E9A6A60D] rounded-xl p-4`}>
            <Image src={cartoon.picture} className={`rounded-xl h-auto w-${imageWidth} aspect-[${imageAspectRatio}]`} onPress={props.onPress} resizeMode="contain"/>
            <View className={`flex flex-col pl-2 shrink`}>
                <Text className="text-white font-bold">{cartoon.title}</Text>
                <View className={"flex flex-row"}>
                    <Text className="text-gray-500 pr-2">Review by <Text className="text-rose-300">{user.username}</Text></Text>
                    <Rating rating={review.stars}/>
                </View>
                <Text className={`text-white pt-2`}>{review.comment}</Text>
            </View>
        </View>
    )
}

const ReviewList = (props) => {
    const [selected, setSelected] = useState();
    // Get user from review's user_id
    const [user, setUser] = useState({
        username: "Greg"
    })
    // Get cartoon from review's cartoon_id
    const [cartoon, setCartoon] = useState(sampleCartoon)

    useEffect(() => {
        if (selected) props.navigation.navigate("review")
    }, [selected])

    const Reviews = () => {
        return props.reviews.map((review, i) => <ReviewCard
            review={review}
            cartoon={cartoon}
            user={user}
            key={review._id}
            onPress={() => setSelected(item)}
        />)
    }
    
    const Header = () => {
        return <Text className="text-white pb-4 font-bold">{props.title}</Text>
    }

    return (
        <SafeAreaView className={"flex flex-1"}>
            <Header/>
            <View className="flex flex-col">
                <Reviews/>
            </View>
        </SafeAreaView>
    )
}

export default ReviewList;