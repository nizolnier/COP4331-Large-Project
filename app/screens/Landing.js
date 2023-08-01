import { useState, useEffect } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { baseUrl } from '../constants/url';
import { useIsFocused } from '@react-navigation/native';

const bgColor = '#1F1D36'

const Landing = ({navigation}) => {
    const isFocused = useIsFocused();
    const [state, setState] = useState();

    useEffect(() => {
        if (isFocused) getState();
    }, [isFocused])

    // If user is logged in, navigate to Home
    const getState = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                navigation.navigate('Home')
            }
            else {
                console.log("Not logged in")
            }
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Image source={require('../assets/landing-mobile.png')} className='h-3/5 w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-center h-full w-full mx-auto mt-12'}>
                <View className={'mx-auto'}>
                    <LogoSVG/>
                </View>
                <Text className={'text-textLight text-center w-3/5 mx-auto pb-12 pt-4 text-xl'}>Track cartoons you've watched. Save those you want to see. Tell your friends what's fire.</Text>
                <Pressable title="Get Started" onPress={() => navigation.navigate('Signup')} className={'w-1/3 bg-pinkLight rounded-full p-2 text-center mx-auto  text-xl'}>
                    <Text className={'text-center  text-lg font-bold text-bgDark'}>Get Started</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Landing;