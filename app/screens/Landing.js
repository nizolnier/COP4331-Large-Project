import * as React from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';

const bgColor = '#1F1D36'

const Landing = ({navigation}) => {
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