import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import CartoonCard from './CartoonCard';

const CartoonScroller = (props) => {
    // change this to change card size
    const cardHeight = "48";

    const [selectedCartoon, setSelectedCartoon] = useState();

    useEffect(() => {
        if (selectedCartoon) props.navigation.navigate("Cartoon")
    }, [selectedCartoon])

    const renderItem = ({item}) => {
        return (
            <CartoonCard
            cartoon={item}
            cardHeight={cardHeight}
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
                className={`h-${cardHeight}`}
            />
        </SafeAreaView>
    )
}

export default CartoonScroller;