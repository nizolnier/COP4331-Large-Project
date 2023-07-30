import { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { baseUrl } from '../constants/url';

const bgColor = '#1F1D36'

const Login = () => {
    const [username, onChangeLogin] = useState('')
    const [password, onChangePassword] = useState('')
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [errorType, setErrorType] = useState('')

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const validateFormData = () => {
        if (username.length > 0 && !username.match(/^[A-Za-z0-9_.]+$/)) {
            setError("Invalid username")
            setErrorType("username")
            return false;
        }
        else {
            setError("")
            setErrorType("")
            return true;
        }
    }

    const empty = () => {
        if (username.length == 0) {
            setError("Please enter your username.")
            setErrorType("username")
            return true;
        } 
        else if (password.length == 0) {
            setError("Please enter your password.")
            setErrorType("password")
            return true;
        } 
        return false;
    }

    const onPressLogin = () => {
        // check if input is valid
        if (empty() || !validateFormData()) {
            return;
        }

        let form = {
            username,
            password
        }

        axios.post(`${baseUrl}/users/login`, form).then(async (response) => {
            if (response) {
                console.log(response)
                try {
                    // set token
                    await AsyncStorage.setItem('TOKEN', response.data.token)
                    await AsyncStorage.setItem('USERNAME', response.data.username)
                    await AsyncStorage.setItem('NAME', response.data.name)
                    navigation.navigate('Verify')
                } catch {
                    console.log(error)
                    setError("Couldn't store user token.")
                    return;
                }
            }

        }).catch((err) => {
            if (err.response) {
                setError(err.response.data.error)
            }
        })
    }

    return (
        <View>
            <Image source={require('../assets/bg-mobile.png')} className='h-full w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-end h-full w-full mx-auto pb-12'}>
                <View className={'mx-auto'}>
                    <LogoSVG/>
                </View>
                <Text className={'text-textLight text-center w-3/5 mx-auto pt-4 text-xl font-bold '}>Login</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>Please sign in to continue.</Text>
                <View className={`h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 ${errorType === "username" ? 'border border-red-600' : ''}`}>
                    <Ionicons name="person" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeLogin} onBlur={validateFormData} onSubmitEditing={()=>passwordRef.current.focus()} value={username} placeholder={'Username'} className={'w-full px-4 pr-12 text-textDark'}/>
                </View>
                <View className={`h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-4 mb-8 ${errorType === "password" ? 'border border-red-600' : ''}`}>
                    <Ionicons name="lock-closed-outline" color={'white'}></Ionicons>
                    <TextInput secureTextEntry={!isPasswordVisible} ref={passwordRef} onChangeText={onChangePassword} placeholder={'Password'} className={'w-full px-4 text-textDark pr-12'}/>
                    <View className={'absolute right-4 text-xl'}>
                        <Ionicons color="white" onPress={togglePasswordVisibility} name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}></Ionicons>
                    </View>
                    <Text className={'text-sm text-pinkDark absolute bottom-[-24] right-0'}><Link to={{screen: 'ForgotPassword'}}>Forgot Password?</Link></Text>
                </View>
                <View>
                    <Text className="color-red-600 text-center">{error}</Text>
                </View>
                <Pressable title="Login" onPress={onPressLogin} className={'w-1/3 bg-pinkLight rounded-full p-2 my-2 text-center mx-auto text-xl'}>
                    <Text className={'text-center  text-lg font-bold'}>Login</Text>
                </Pressable>
                <Text className={'text-center w-3/5 mx-auto pb-4 text-xm text-pinkLight'}>Don't have an account? <Link to={{screen: 'Signup'}}><Text className={'text-pinkDark'}>Sign Up</Text></Link></Text>
            </View>
        </View>
    )
}

export default Login;