import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const Card = (props) => {
    const cartoon = props.cartoon;

    // change this to change card size
    const cardWidth = 24;
    // image aspect ratio is currently 2:3
    const imageAspectRatio = '2/3';

    return (
        <View className={`mx-2 w-${cardWidth} flex flex-col`}>
            <Image src={cartoon.picture} className={`rounded-xl w-full h-auto aspect-[${imageAspectRatio}] shrink`} onPress={props.onPress} resizeMode="contain"/>
            <View className="flex flex-row mt-1 justify-center items-center grow">
                <Text className="text-white pl-2 pr-1">{cartoon.nfavorites}</Text>
                <Ionicons name="heart" color="red"></Ionicons>
                <Text className="text-white pl-2 pr-1">{cartoon.nrating}</Text>
                <Ionicons name="star" color="yellow"></Ionicons>
                <Text className="text-white pl-2 pr-1">{cartoon.avgrating} %</Text>
            </View>
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

    const title = () => {
        return <Text className="text-white pb-4 font-bold">{props.title}</Text>
    }

    return (
        <SafeAreaView className={"flex flex-1"}>
            {props.cartoons.length ? <Text className="text-white pb-4 font-bold">{props.title}</Text> : null}
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