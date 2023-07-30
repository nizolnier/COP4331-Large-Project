import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import CartoonCard from '../components/CartoonCard';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useProtectedPage } from '../hooks/useProtectedPage';

const Watchlist = () => {
    const inFocused = useIsFocused();

    useProtectedPage();

    useEffect(() => {
        if (inFocused) getWatchList();
    }, [inFocused])

    const getWatchList = async () => {
        try {
            const username = await AsyncStorage.getItem('USERNAME')
            if (username !== null) {
                axios.get(`${baseUrl}/users/oneuser/${username}`, form)
            }
            else {
                console.log("Not logged in")
            }
        } catch(error) {
            setError("Error reading token.")
        }
    }

    const VerticalList = () => {
        cartoons.map((cartoon) => {
            return (
                <CartoonCard cartoon={cartoon} onPress={() => props.navigation.navigate("Cartoon")}/>
            )
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-[#1F1D36] p-4">
            <ScrollView scrollEnabled={true}>
                <VerticalList cartoons={watchlist}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Watchlist;