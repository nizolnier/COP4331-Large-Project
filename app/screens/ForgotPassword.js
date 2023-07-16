import { useEffect, useState } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import { onChange } from 'react-native-reanimated';

const bgColor = '#1F1D36'

const ForgotPassword = () => {
    const [email, onChangeEmail] = useState('')

    useEffect(() => {

    }, [email])

    const onPressSendCode = () => {

    }

    return (
        <View>
            <Image source={require('../assets/bg-mobile.png')} className='h-full w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-end h-full w-full mx-auto  pb-12'}>
                <Text className={'text-textLight text-center w-3/5 mx-auto pt-4 text-xl font-bold'}>Forgot Password?</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>Don't worry! It happens.</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>Please enter the email associated with your account.</Text>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-4 mb-8 text-textLight'}>
                    <Ionicons name="mail-outline" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeEmail} value={email} placeholder={'Email'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <Pressable title="Send Code" onPress={onPressSendCode} className={'w-1/3 bg-pinkLight rounded-full p-2 my-2 text-center mx-auto text-xl'}>
                    <Text className={'text-center  text-lg font-bold'}>Send Code</Text>
                </Pressable>
                <Text className={'text-center w-3/5 mx-auto pb-4 text-xm text-pinkLight'}>Remember password? <Link to={{screen: 'Login'}}><Text className={'text-pinkDark'}>Log In</Text></Link></Text>
            </View>
        </View>
    )
}

export default ForgotPassword;