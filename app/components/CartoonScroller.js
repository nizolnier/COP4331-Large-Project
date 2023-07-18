import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const Card = (props) => {
    const cartoon = props.cartoon;

    return (
        <View className={"w-32 mx-1"}>
            <Image src={cartoon.picture} className="h-5/6 rounded-xl" onPress={props.onPress} resizeMode="contain"/>
            <View className="flex flex-row my-1 justify-center items-center">
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

    return (
        <SafeAreaView className={"flex flex-1 h-64"}>
            <Text className="text-white">{props.title}</Text>
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