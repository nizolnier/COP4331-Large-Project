import { useEffect, useState } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import { onChange } from 'react-native-reanimated';

const bgColor = '#1F1D36'

const ResetPassword = () => {
    const [password, onChangePassword] = useState('')
    const [confirmPassword, onChangeConfirmPassword] = useState('')

    useEffect(() => {

    }, [password])

    useEffect(() => {

    }, [confirmPassword])

    const onPressReset = () => {

    }

    return (
        <View>
            <Image source={require('../assets/bg-mobile.png')} className='h-full w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-center h-full w-full mx-auto mt-10'}>
                <Text className={'text-textLight font-bold text-center w-3/5 mx-auto pt-4 text-xl'}>Reset Password</Text>
                <Text className={'text-textDark text-center w-full mx-auto pb-8 text-md'}>Please type something you'll remember.</Text>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1 text-textLight'}>
                    <Ionicons name="lock-closed-outline" color={'white'}></Ionicons>
                    <TextInput secureTextEntry={true} onChangeText={onChangePassword} value={password} placeholder={'New Password'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1 text-textLight'}>
                    <Ionicons name="lock-closed-outline" color={'white'}></Ionicons>
                    <TextInput secureTextEntry={true} onChangeText={onChangeConfirmPassword} value={confirmPassword} placeholder={'Confirm New Password'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <Pressable onPress={onPressReset} className={'w-1/3 bg-pinkLight rounded-full p-2 my-4 mt-8 text-center mx-auto text-xl'}>
                    <Text className={'text-center  text-lg font-bold'}>Reset</Text>
                </Pressable>
                <Text className={'text-center w-3/5 mx-auto pb-4 text-xm text-pinkLight'}>Remember password? <Link to={{screen: 'Login'}}><Text className={'text-pinkDark'}>Log In</Text></Link></Text>
            </View>
        </View>
    )
}

export default ResetPassword;