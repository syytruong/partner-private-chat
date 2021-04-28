import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Input, Button  } from 'react-native-elements';
import styled from 'styled-components';
import { Page, Heading } from '../components/index';
import { getToken, sendPushNotification, Token } from '../services/api';

const ButtonContainer = styled(View)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

const SummonButton = styled(TouchableOpacity)<{ color?: string}>`
    background-color: ${p => p.color || 'red'};
    flex: 48% 0;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    height: 150px;
    align-items: center;
    justify-content: center;
    color: #fff;
`

const SummonButtonText = styled(Text)`
    color: #fff;
    font-size: 18px;
`

const token = 'ExponentPushToken[cOZAYTGRXvPRGkXmuEpfFi]';

const FemaleScreen : React.FC = () => {
    const [tokenInput, setTokenInput] = React.useState('')
    const [token, setToken] = React.useState<Token | undefined>()

    return (
    <View>
        <Header centerComponent={{ text: 'For female 👧', style: {color: '#fff'} }} />

        <View>
            <Page>
                {token ? (<View>
                    <Heading>You have connected to your boyfriend</Heading>
                    <Heading>Start sending message to him!</Heading>
                </View>) : <View>
                    <Input value={tokenInput} onChangeText={setTokenInput} lable="Partner's code" placeholder="Enter your partner's code" />
                    <Button title="Confirm code" onPress={async () => {
                        const storedInput = await getToken(tokenInput)
                        setToken(storedInput)
                    }} />
                </View>}
                
            
                {token && 
                 <View style={{ marginTop: 30 }}>
                    <Heading>Summon your boy</Heading>
                    <ButtonContainer>
                        <SummonButton 
                        color="#e74c3c" 
                        onPress={() => 
                            sendPushNotification(
                                token?.token, 
                                'Wash the dishes', 
                                'Can you wash the dishes please? They are too many'
                            )
                        }>
                            <SummonButtonText>Wash the dishes🧫</SummonButtonText>
                        </SummonButton>
                        <SummonButton 
                        color="#2980b9"
                        onPress={() => 
                            sendPushNotification(
                                token?.token, 
                                'Do Laundry', 
                                'Remember to do laundry hun'
                            )
                        }>
                            <SummonButtonText>Remember to do laundry🧺</SummonButtonText>
                        </SummonButton>
                        <SummonButton 
                        color="#2ecc71"
                        onPress={() => 
                            sendPushNotification(
                                token?.token, 
                                'Cook dinner', 
                                'I might be get home late today, can you cook somethhing?'
                            )
                        }>
                            <SummonButtonText>Cook for me 👨‍🍳, I'm busy today</SummonButtonText>
                        </SummonButton>
                        <SummonButton 
                        color="#f1c40f"
                        onPress={() => 
                            sendPushNotification(
                                token?.token, 
                                `Let's eat out`, 
                                'Hey, how about we go out for dinner tonight? Pick me up after work'
                            )
                        }>
                            <SummonButtonText>Let's eat out🍽️, pick me up after work</SummonButtonText>
                        </SummonButton>
                    </ButtonContainer>
                </View>
                }
            </Page>
        </View>
    </View>
    )
}

export default FemaleScreen;