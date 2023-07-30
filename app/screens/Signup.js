import { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from '@react-navigation/native';

import { baseUrl } from '../constants/url'
import axios from 'axios'

const bgColor = '#1F1D36'

const createUser = async (form) => {
    const res = await axios.post(`${baseUrl}/users/signup`, form)
    console.log(res.data)
    return res.data.json();
}

const Signup = ({navigation}) => {
    const [name, onChangeName] = useState('')
    const [username, onChangeUsername] = useState('')
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState("")
    const [confirmPassword, onChangeConfirmPassword] = useState("")
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    
    const [error, setError] = useState('')
    const [errorType, setErrorType] = useState('')

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    useEffect(() => {
        if (confirmPassword.length >= password.length) validateFormData();
    }, [confirmPassword])

    const validateFormData = () => {
        if (password.length > 0 && !password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            setError("Passwords must have eight characters, at least one letter, and at least one number")
            setErrorType("password")
            return false;
        }
        else if (confirmPassword.length > 0 && password !== confirmPassword) {
            setError("Passwords do not match")
            setErrorType("password")
            return false;
        }
        else if (email.length > 0 && !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setError("Invalid email address")
            setErrorType("email")
            return false;
        }
        else if (name.length > 0 && !name.match(/^[A-Za-z]+$/)) {
            setError("Invalid name")
            setErrorType("name")
            return false;
        }
        else if (username.length > 0 && !username.match(/^[A-Za-z0-9_.]+$/)) {
            setError("Username must use only letters, numbers, underscores, or periods")
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
        if (name.length == 0) {
            setError("Please fill out your name")
            setErrorType("name")
            return true;
        } 
        else if (username.length == 0) {
            setError("Please create a username.")
            setErrorType("username")
            return true;
        } 
        else if (email.length == 0) 
        {
            setError("Please provide an email.")
            setErrorType("email")
            return true;
        }
        else if (password.length == 0) 
        {
            setError("Please create a password.")
            setErrorType("password")
            return true;
        }
        else if (confirmPassword.length == 0) 
        {
            setError("Please confirm your password.")
            setErrorType("confirmPassword")
            return true;
        }
        return false;
    }

    const onPressSignup = async () => {
        let form = {
            name,
            username,
            email,
            password
        }

        if (empty() || !validateFormData()) {
            return;
        }

        try {
            await AsyncStorage.setItem('EMAIL', email);
        } catch(error) {
            console.log(error)
            setError("Couldn't store email.")
            return;
        }

        axios.post(`${baseUrl}/users/signup`, form).then((response) => {

            if (response) {
                axios.post(`${baseUrl}/users/send-email`, {email}).then((response) => {
                    if (response) {
                        navigation.navigate('Verify')
                    }
                }).catch((err) => {
                    if (err.response) {
                        setError(err.response.data.error)
                    }
                })
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
            <View className={'flex flex-column justify-end h-full w-full mx-auto  pb-12'}>
                <View className={'mx-auto'}>
                    <LogoSVG/>
                </View>
                <Text className={'text-textLight text-center w-3/5 mx-auto pt-4 text-xl font-bold'}>Signup</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>Create an account to continue.</Text>
                <View className={`h-10 w-2/3 bg-bgLight rounded-full flex flex-row pr-8 mx-auto items-center pl-4 my-1 ${errorType === "name" ? 'border border-red-600' : ''}`}>
                    <Ionicons name="person" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeName} onBlur={validateFormData} onSubmitEditing={() => usernameRef.current.focus()} value={name} placeholder={'Full Name'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <View className={`h-10 w-2/3 bg-bgLight rounded-full flex flex-row pr-8 mx-auto items-center pl-4 my-1 ${errorType === "username" ? 'border border-red-600' : ''}`}>
                    <Ionicons name="person" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeUsername} onBlur={validateFormData} value={username} onSubmitEditing={() => emailRef.current.focus()} ref={usernameRef} placeholder={'Username'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <View className={`h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1 pr-8 text-textLight ${errorType === "email" ? 'border border-red-600' : ''}`}>
                    <Ionicons name="mail-outline" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeEmail} onBlur={validateFormData} onSubmitEditing={() => passwordRef.current.focus()} ref={emailRef} autoComplete="email" value={email} placeholder={'Email'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <View className={`h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1 pr-8 text-textLight ${errorType === "password" ? 'border border-red-600' : ''}`}>
                    <Ionicons name="lock-closed-outline" color={'white'}></Ionicons>
                    <TextInput secureTextEntry={!isPasswordVisible} onChangeText={onChangePassword} value={password} placeholder={'Password'} onSubmitEditing={() => confirmPasswordRef.current.focus()} ref={passwordRef} onBlur={validateFormData} className={`w-full px-4 pr-12 text-textLight`}/>
                    { !isPasswordVisible ? 
                    <Ionicons name="eye-off-outline" color={'white'} onPress={togglePasswordVisibility}></Ionicons>
                    :
                    <Ionicons name="eye-outline" color={'white'} onPress={togglePasswordVisibility}></Ionicons>
                    }
                </View>
                <View className={`h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1 mb-8 pr-8 text-textLight ${errorType === "password" ? 'border border-red-600' : ''}`}>
                    <Ionicons name="lock-closed-outline" color={'white'}></Ionicons>
                    <TextInput secureTextEntry={!isPasswordVisible} onChangeText={onChangeConfirmPassword} onBlur={validateFormData} onSubmitEditing={onPressSignup} ref={confirmPasswordRef} value={confirmPassword} placeholder={'Confirm Password'} className={`w-full px-4 pr-18 text-textLight`}/>
                    { !isPasswordVisible ? 
                    <Ionicons name="eye-off-outline" color={'white'} onPress={togglePasswordVisibility}></Ionicons>
                    :
                    <Ionicons name="eye-outline" color={'white'} onPress={togglePasswordVisibility}></Ionicons>
                    }
                </View>
                <View>
                    <Text className="color-red-600 text-center">{error}</Text>
                </View>
                <Pressable title="Signup" onPress={onPressSignup} className={'w-1/3 bg-pinkLight rounded-full p-2 my-2 text-center mx-auto text-xl'}>
                    <Text className={'text-center  text-lg font-bold'}>Signup</Text>
                </Pressable>
                <Text className={'text-center w-3/5 mx-auto pb-4 text-xm text-pinkLight'}>Already have an account? <Link to={{screen: 'Login'}}><Text className={'text-pinkDark'}>Login</Text></Link></Text>
            </View>
        </View>
    )
}

export default Signup;