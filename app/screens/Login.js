import { useEffect, useState } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from '@react-navigation/native';

const bgColor = '#1F1D36'

const Login = () => {
    const [login, onChangeLogin] = useState('')
    const [password, onChangePassword] = useState('')

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    useEffect(() => {

    }, [login])

    useEffect(() => {

    }, [password])

    const onPressLogin = () => {

    }

    return (
        <View>
            <Image source={require('../assets/bg-mobile.png')} className='h-full w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-center h-full w-full mx-auto mt-10'}>
                <View className={'mx-auto'}>
                    <LogoSVG/>
                </View>
                <Text className={'text-textLight text-center w-3/5 mx-auto pt-4 text-xl'}>Login</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>Please sign in to continue.</Text>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 '}>
                    <Ionicons name="person" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeLogin} value={login} placeholder={'Login'} className={'px-4 text-textDark'}/>
                </View>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-4 mb-8'}>
                    <Ionicons name="lock-closed-outline" color={'white'}></Ionicons>
                    <TextInput secureTextEntry={!isPasswordVisible} nChangeText={onChangePassword} placeholder={'Password'} className={'px-4 text-textDark'}/>
                    <View className={'absolute right-4'}>
                        <Ionicons color="white" onPress={togglePasswordVisibility} name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}></Ionicons>
                    </View>
                    <Text className={'text-sm text-pinkDark absolute bottom-[-24] right-0'}><Link to={{screen: 'ForgotPassword'}}>Forgot Password?</Link></Text>
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