import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation}) => {

    useEffect(() => {
        doLogout()
    })

    const doLogout = async () => {
        try {
            await AsyncStorage.removeItem("TOKEN")
            await AsyncStorage.removeItem("USERNAME")
            await AsyncStorage.removeItem("NAME")
        }
        catch (err) {
            console.error(err)
        }

        navigation.navigate("Landing")
    }
}

export default Logout