import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Profile = ({navigation}) => {
    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        navigation.setOptions({
            icon: () => (
                <Ionicons name="person-outline" />
            ),
        });
    }, [navigation]);

    return (
        <View>
            <Text>Profile Screen</Text>
        </View>
    )
}

export default Profile;