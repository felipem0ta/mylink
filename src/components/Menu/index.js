import React from 'react'

import { Feather } from '@expo/vector-icons'
import {ButtonMenu} from './styles';
import { useNavigation } from '@react-navigation/native';


export default function Menu(){
    const navigation = useNavigation();
    return(
       <ButtonMenu onPress= { ()=> navigation.openDrawer() } >
        <Feather name="menu" size={40} color="#FFF"></Feather>
       </ButtonMenu>
    )
}