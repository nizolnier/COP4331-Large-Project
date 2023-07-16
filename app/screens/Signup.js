import { useEffect, useState } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from '@react-navigation/native';

const bgColor = '#1F1D36'

const Signup = ({navigation}) => {
    const [login, onChangeSignup] = useState('')
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('')
    const [confirmPassword, onChangeConfirmPassword] = useState('')

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    useEffect(() => {

    }, [login])

    const onPressSignup = () => {
        navigation.navigate('Verify')
    }

    return (
        <View>
            <Image source={require('../assets/bg-mobile.png')} className='h-full w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-center h-full w-full mx-auto mt-8'}>
                <View className={'mx-auto'}>
                    <LogoSVG/>
                </View>
                <Text className={'text-textLight text-center w-3/5 mx-auto pt-4 text-xl font-bold'}>Signup</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>Create an account to continue.</Text>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1'}>
                    <Ionicons name="person" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeSignup} value={login} placeholder={'Signup'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1 text-textLight'}>
                    <Ionicons name="mail-outline" color={'white'}></Ionicons>
                    <TextInput onChangeText={onChangeEmail} value={email} placeholder={'Email'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1 text-textLight'}>
                    <Ionicons name="lock-closed-outline" color={'white'}></Ionicons>
                    <TextInput secureTextEntry={true} onChangeText={onChangePassword} value={password} placeholder={'Password'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <View className={'h-10 w-2/3 bg-bgLight rounded-full flex flex-row mx-auto items-center pl-4 my-1 text-textLight'}>
                    <Ionicons name="lock-closed-outline" color={'white'}></Ionicons>
                    <TextInput secureTextEntry={true} onChangeText={onChangeConfirmPassword} value={confirmPassword} placeholder={'Confirm Password'} className={'w-full px-4 pr-12 text-textLight'}/>
                </View>
                <Pressable title="Signup" onPress={onPressSignup} className={'w-1/3 bg-pinkLight rounded-full p-2 my-1 mt-4 text-center mx-auto text-xl'}>
                    <Text className={'text-center  text-lg font-bold'}>Signup</Text>
                </Pressable>
                <Text className={'text-center w-3/5 mx-auto pb-4 text-xm text-pinkLight'}>Already have an account? <Link to={{screen: 'Login'}}><Text className={'text-pinkDark'}>Login</Text></Link></Text>
            </View>
        </View>
    )
}

export default Signup;