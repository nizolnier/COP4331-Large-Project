import { useEffect } from 'react'

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
            setError("Error reading token.")
        }
    }

}