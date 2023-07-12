import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = ({navigation}) => {

    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name="search-outline" onPress={() => navigation.navigate('Search')} size={20}/>
            ),
        });
    }, [navigation]);
}

export default Home;