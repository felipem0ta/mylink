import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Modal, ActivityIndicator } from 'react-native';

import StatusBarPage from '../../components/StatusBarPage';
import Menu from '../../components/Menu';
import {
    ContainerLogo, ContainerContent, ContainerInput, BoxIcon, Logo, Title, Subtitle,
    Input, ButtonLink, ButtonLinkText
} from './styles';
import ModalLink from '../../components/ModalLink';

import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import {linkSave} from '../../utils/storeLinks'



export default function Home() {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [go, setGo] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    async function handleShortLink() {
        setLoading(true);
        try {
            const response = await api.post('/shorten',
                {
                    long_url: input
                }
            )

            setData(response.data);
            setModalVisible(true);

            linkSave('links', response.data );

            Keyboard.dismiss();
            setLoading(false);
            setInput('');
            
                
            

        } catch {

            alert('Ops, você digitou uma URL inválida');
            Keyboard.dismiss();
            setInput('');
            setLoading(false);

        }

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <LinearGradient
                colors={['#1ddbb9', '#132742']}
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <StatusBarPage
                    barStyle="light-content"
                    backgroundColor="#1ddbb9"
                />
                <Menu />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? 'padding' : 'position'}
                    enabled
                >
                    <ContainerLogo>
                        <Logo source={require('../../assets/Logo.png')} resizeMode="contain" />
                    </ContainerLogo>

                    <ContainerContent>
                        <Title>SujeitoLink</Title>
                        <Subtitle>Cole seu link para Encurtar</Subtitle>

                        <ContainerInput>
                            <BoxIcon>
                                <Feather name="link" size={22} color="#FFF" />
                            </BoxIcon>
                            <Input
                                placeholder="Cole aqui seu Link..."
                                placeholderTextColor="#FFF"
                                autoCapitalize="none"
                                autoCorrect={false}
                                KeyboardType="url"
                                value={input}
                                onChangeText={(texto) => setInput(texto)}

                            />
                        </ContainerInput>

                        <ButtonLink onPress={handleShortLink}>
                            {
                                loading ? (
                                    <ActivityIndicator
                                      color= "#121212"
                                      size={24}
                                    />
                                ) : (<ButtonLinkText>Gerar Link Curto</ButtonLinkText>)
                            }

                            
                        </ButtonLink>

                    </ContainerContent>
                </KeyboardAvoidingView>

                <Modal visible={modalVisible} transparent animationType="slide">

                    <ModalLink onClose={() => setModalVisible(false)} data={data} />

                </Modal>

            </LinearGradient>
        </TouchableWithoutFeedback>

    )
}