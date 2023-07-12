import { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput  } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

const Search = ({navigation}) => {
    const [search, updateSearch] = useState('');

    useEffect(() => {
        // Search bar
        navigation.setOptions({
            headerRight: ({ navigation, route, options }) => {
              return <SafeAreaView style={styles.container}>
                    <TextInput
                        placeholder="Type Here..."
                        style={styles.input}
                        onChangeText={updateSearch}
                        value={search}
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

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        height: 40,
        margin: 12,
        width: '100%',
        borderWidth: 0,
        padding: 10,
    },
});


export default Search;