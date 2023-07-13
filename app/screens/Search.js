import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput  } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

const Search = ({navigation}) => {

    useEffect(() => {
        // Search bar
        navigation.setOptions({
            headerRight: ({ navigation, route, options }) => {
              return <SafeAreaView>
                    <TextInput
                        placeholder="Type Here..."
                    />
                </SafeAreaView>
            },
        });
    }, [navigation]);

    return (
        <View>
            <Text>Search Screen</Text>
        </View>
    )
}

export default Search;