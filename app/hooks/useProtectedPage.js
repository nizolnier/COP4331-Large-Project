import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// protecting pages that u need to be logged on to see
export function useProtectedPage({navigation}) {
    useEffect(() => {
        if (!getToken()) {
            navigation.navigate('Login')
        }

    }, [navigation])

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            if (token !== null) {
                return true;
            }
            else {
                return false;
            }
        } catch(error) {
            console.log(error)
            return false;
        }
    }

}