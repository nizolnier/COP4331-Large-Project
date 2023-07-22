import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import CardRating from './CardRating';

const Card = ({navigation, ...props}) => {
    const cartoon = props.cartoon;

    // change this to change card size
    const cardWidth = 24;
    // image aspect ratio is currently 2:3
    const imageAspectRatio = '2/3';

    return (
        <View className={`mx-2 w-${cardWidth} flex flex-col`}>
            <Image src={cartoon.picture} className={`rounded-xl w-${cardWidth} h-auto aspect-[${imageAspectRatio}] shrink`} onPress={props.onPress} resizeMode="contain"/>
            <CardRating avgRating={cartoon.avgrating} numRatings={cartoon.nrating}/>
        </View>
    )
}

const CartoonScroller = (props) => {
    const [selectedCartoon, setSelectedCartoon] = useState();

    useEffect(() => {
        if (selectedCartoon) props.navigation.navigate("Cartoon")
    }, [selectedCartoon])

    const renderItem = ({item}) => {
        return (
            <Card
            cartoon={item}
            onPress={() => setSelectedCartoon(item)}
            />
        );
    };

    const Header = () => {
        return <Text className="text-white pb-4 font-bold">{props.title}</Text>
    }

    return (
        <SafeAreaView className={"flex flex-1"}>
            <Header/>
            <FlatList
                data={props.cartoons}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                extraData={selectedCartoon}
                horizontal={true}
                indicatorStyle="white"
            />
        </SafeAreaView>
    )
}

export default CartoonScroller;