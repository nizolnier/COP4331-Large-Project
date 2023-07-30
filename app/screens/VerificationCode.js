import { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient'

import LogoSVG from '../components/LogoSVG';
import { TextInput } from 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';
import { baseUrl } from '../constants/url';
import axios from 'axios'

const bgColor = '#1F1D36'

const VerificationCode = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [code, setCode] = useState('')
    const [cursorClass, setCursorClass] = useState('')

    // get email from react native's async storage
    const getEmail = async () => {
        try {
            const val = await AsyncStorage.getItem('EMAIL');
            if (val !== null) {
                setEmail(val)
            }
            else {
                setError("Email is null.")
            }
        } catch(error) {
            setError("Error reading email.")
        }
    }

    useEffect(() => {
        getEmail()
    }, [])

    const [codeArray, setCodeArray] = useState([])

    const onPressVerify = () => {
        // validate input
        if (code.length != 5)
        {
            setError("Invalid number of digits.")
            return;
        }

        if (!code.match(/[0-9]{5}/)) {
            setError("Invalid format.")
            return;
        }

        let form = {
            code,
            email
        }

        // send verification request
        axios.post(`${baseUrl}/users/verify`, form).then((response) => {
            if (response) {
                // navigate to login page
                navigation.navigate('Login')
            }
        }).catch((err) => {
            if (err.response) {
                setError(err.response.data.error)
            }
        })
    }

    const onChange = (text) => {
        // make sure code consists only of numbers
        if (!text.match(/[0-9]/)) {
            setCode(text.replace(/[^0-9]/g, ''))
        }
        // update the code and fake fields
        setCode(text)
        setCodeArray(text.split(''));
        // hide the cursor
        setCursorClass('opacity-0')

        if (text.length == 0) {
            // revealll the cursor
            setCursorClass('')
        }
    }

    // renders the boxes
    // actual input field is hidden
    const FakeField = ({id}) => {
        return (<View className={'h-10 w-1/6 bg-bgLight rounded-full p-1 mx-auto my-4 mb-8 mx-1'}>
            <Text className="m-auto text-textLight text-2xl">{codeArray[id]}</Text>
        </View>)
    }

    return (
        <View>
            <Image source={require('../assets/bg-mobile.png')} className='h-full w-full bg-gradient-to-b from-bgDark z-1 absolute top-0'/>
            <LinearGradient colors={['transparent', bgColor]} locations={[0.1, 0.6]}className='absolute h-full w-full z-2'/>
            <View className={'flex flex-column justify-end h-full w-full mx-auto pb-12'}>
                <Text className={'text-textLight text-center w-3/5 mx-auto pt-4 text-xl font-bold'}>Please check your email</Text>
                <Text className={'text-textDark text-center w-3/5 mx-auto pb-4 text-md'}>We've sent you a verification code at {email}</Text>
                <View className={'h-10 w-2/3 mx-auto mb-12 flex flex-row justify-center'}>
                    <FakeField id={0}/>
                    <FakeField id={1}/>
                    <FakeField id={2}/>
                    <FakeField id={3}/>
                    <FakeField id={4}/>
                    <TextInput maxLength={5} keyboardType="numeric" autofocus={true} value={code} selectionColor={'green'} onSubmitEditing={onPressVerify} onChangeText={onChange} className={`px-4 w-full absolute top-5 text-transparent text-xl m-auto pl-7 ${cursorClass}`}/>
                </View>
                <View>
                    <Text className="color-red-600 text-center">{error}</Text>
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