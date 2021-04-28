import * as React from 'react';
import { View, Text } from 'react-native';
import { Header, Input, Button  } from 'react-native-elements';
import styled from 'styled-components';
import { Page, Heading } from '../components/index';
import * as Notifications from 'expo-notifications';
import { submitToken, Token } from '../services/api';

async function getNotificationToken() {
    const {status} = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Failed to get notification token');
            return;
        }
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    console.log({token});
    return token;
}

const MaleScreen : React.FC = () => {
    const [token, setToken] = React.useState<Token | undefined>();

    return (
    <View>
        <Header centerComponent={{ text: 'For male 👦', style: {color: '#fff'} }} />
        <Page>
            <Heading>
                {token ? `Your code is ${token.id}` : `Click here to get the code`}
            </Heading>
            <Button 
                title="Get code" 
                onPress={async () => {
                    const token = await getNotificationToken()
                    if (token) {
                        const storedToken = await submitToken(token)
                        setToken(storedToken)
                    }
                }} 
            />
        </Page>
    </View>)
}

export default MaleScreen;