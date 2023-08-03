import * as React from 'react';
import { View, Text, Button } from 'react-native';

const Cartoon = (cartoon) => {
    return (
        <View>
            <Text>Cartoon: {cartoon.title}</Text>
        </View>
    )
}

export default Cartoon;