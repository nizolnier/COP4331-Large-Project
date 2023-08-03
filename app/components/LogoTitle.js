import * as React from 'react';
import { View, Text, Image } from 'react-native'

const LogoTitle = ({navigation}) => {
    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified in App.js
        navigation.setOptions({
            headerTitle: () => (
                <Text>Between Shows</Text>
            ),
        });
    }, [navigation]);
}

export default LogoTitle;