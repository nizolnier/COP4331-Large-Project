import * as React from 'react';
import { View, Text, Button } from 'react-native';

const Landing = ({navigation}) => {
    return (
        <View>
            <Text>“Track cartoons you've watched. Save those you want to see. Tell your friends what's fire.”</Text>
            <Button title="Get Started" onPress={() => navigation.navigate('Signup')}>Get Started</Button>
        </View>
    )
}

export default Landing;