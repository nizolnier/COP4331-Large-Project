import { useEffect, useState } from 'react';
import { View, Text, Pressable, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useIsFocused } from '@react-navigation/native';
import { onChange } from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { baseUrl } from '../constants/url';

const bgColor = '#1F1D36'

const ForgotPassword = ({navigation}) => {
    const [email, onChangeEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const isFocused = useIsFocused()
    
    useEffect(() => {
        if (isFocused) resetData()
    }, [isFocused])

    const resetData = async () => {
        setError('')
        onChangeEmail('')
        try {
            await AsyncStorage.removeItem("EMAIL")
        }
        catch (err) {
            console.error(err)
        }
    }

    const validateFormData = () => {
        if (email.length > 0 && !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setError("Invalid email address")
            return false;
        }
        else {
            setError('')
            return true;
        }
    }

    const onPressSendCode = () => {
        if (email.length == 0) 
        {
            setError("Please provide an email.")
            return;
        }

        if (!validateFormData()) {
            return;
        }

        let form = {
            email
        }
        setIsLoading(true)

        axios.post(`${baseUrl}/users/send-email`, form).then(async (res) => {
            try {
                await AsyncStorage.setItem("EMAIL", email)

                setIsLoading(false)
                navigation.navigate('Verify', {from: 'ForgotPassword'})
            }
            catch {
                setIsLoading(false)
                setError("Failed to store email.")
            }

        }).catch((err) => {
            setIsLoading(false)
            if (err.response) {
                setError(err.response.data.error)
            }
        })
    }

    return (
        <View>
            <Image source={require('../assets/bg-mobile.png')} className='h-full w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-end h-full w-full mx-auto  pb-12'}>
                <Text className={'text-textLight text-center w-3/5 mx-auto pt-4 text-xl font-bold'}>Forgot Password?</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>Don't worry! It happens.</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>Please enter the email associated with your account.</Text>
                <View>
                    <Text className="color-red-600 text-center">{error}</Text>
                </View>
                { isLoading ? <ActivityIndicator/> : 
                <View className={`h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-4 mb-8 text-textLight ${error != '' ? 'border border-red-600' : ''}`}>
                    <Ionicons name="mail-outline" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeEmail} onBlur={validateFormData} onSubmitEditing={onPressSendCode} value={email} placeholder={'Email'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>}
                <Pressable title="Send Code" onPress={onPressSendCode} className={'w-1/3 bg-pinkLight rounded-full p-2 my-2 text-center mx-auto text-xl'}>
                    <Text className={'text-center  text-lg font-bold'}>Send Code</Text>
                </Pressable>
                <Text className={'text-center w-3/5 mx-auto pb-4 text-xm text-pinkLight'}>Remember password? <Link to={{screen: 'Login'}}><Text className={'text-pinkDark'}>Log In</Text></Link></Text>
            </View>
        </View>
    )
}

export default ForgotPassword;