import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput  } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { baseUrl } from '../constants/url';
import { useIsFocused } from '@react-navigation/native';
import { useProtectedPage } from '../hooks/useProtectedPage';
import { ScrollView } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import CartoonCard from '../components/CartoonCard'
import LogoSVG from '../components/LogoSVG'

const Search = ({navigation}) => {
    const [cartoonResults, setCartoonResults] = useState([])
    const [input, setInput] = useState('')
    const isFocused = useIsFocused()
    
    useProtectedPage(navigation);

    const onChangeInput = (text) => {
        if (text != "") setInput(text)
    }

    useEffect(() => {
        // Search bar
        navigation.setOptions({
            headerRight: ({ navigation, route, options }) => {
              return <SafeAreaView className="w-full flex flex-row justify-end pr-4 items-center">
                    <TextInput
                        placeholder="Type Here..." className="w-full pl-4 text-white" value={input} onChangeText={onChangeInput}
                    />
                    <Ionicons color="gray" name="search-circle-outline" size={24}/>
                </SafeAreaView>
            },
        });
    }, [navigation]);

    useEffect(() => {
        if (isFocused && input.length > 0) {
            fetchCartoons(input, setCartoonResults)
        }
    }, [isFocused, input])

    const fetchCartoons = async (query, setter) => {
        const token = await AsyncStorage.getItem("TOKEN")
        if (token) {
            axios.get(`${baseUrl}/shows/search`, {
                headers: {
                    Authorization: token
                },
                params: {
                    input: query,
                    page: 1,
                    limit: 70
                }
            }).then(res => {
                console.log(res.data.cartoons)
                setter(res.data.cartoons)
            })
            .catch(err => {
                console.error(err)
            })
        }
    }

    let ResultsRender = null;
    if (cartoonResults && cartoonResults.length > 0) {
        ResultsRender = () => cartoonResults.map((show) => {
            return <CartoonCard key={show._id} cartoon={show} cardHeight={"48"} onPress={() => {navigation.navigate("Reviews")}}/>
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-[#1F1D36] p-4 h-full">
            <ScrollView scrollEnabled={true}>
                <View className="flex flex-wrap flex-row">
                    {cartoonResults && cartoonResults.length > 0 ? <ResultsRender/> :
                    <View className="flex justify-center flex-col m-auto h-screen pb-48">
                        <Text className="text-white mx-auto">No results found</Text>
                        <LogoSVG/>
                    </View> }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Search;