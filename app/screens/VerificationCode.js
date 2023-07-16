import { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import { onChange } from 'react-native-reanimated';

const bgColor = '#1F1D36'

const InputField = () => {
    const [input, setInput] = useState('')

    return (
        <View className={'h-10 w-1/6 bg-bgLight rounded-full flex flex-row mx-auto items-center my-4 mb-8 mx-1 text-textLight'}>
            <TextInput onChangeText={setInput} className={'px-4 w-full text-textLight'}/>
        </View>
    )
}

const VerificationCode = () => {
    const [code, setCode] = useState('')

    useEffect(() => {

    }, [code])

    const onPressVerify = () => {

    }

    return (
        <View>
            <Image source={require('../assets/bg-mobile.png')} className='h-full w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-center h-full w-full mx-auto mt-10'}>
                <Text className={'text-textLight text-center w-3/5 mx-auto pt-4 text-xl font-bold'}>Please check your email</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>We've sent you a verification code</Text>
                <View className={'h-10 w-2/3 mx-auto mb-12 flex flex-row justify-center'}>
                    <InputField/>
                    <InputField/>
                    <InputField/>
                    <InputField/>
                    <InputField/>
                </View>
                <Pressable title="Send Code" onPress={onPressVerify} className={'w-1/3 bg-pinkLight rounded-full p-2 my-2 text-center mx-auto text-xl'}>
                    <Text className={'text-center  text-lg font-bold'}>Verify</Text>
                </Pressable>
                <Pressable><Text className={'text-center w-3/5 mx-auto pb-4 text-xm text-pinkDark'}>Send code again </Text></Pressable>
            </View>
        </View>
    )
}

export default VerificationCode;