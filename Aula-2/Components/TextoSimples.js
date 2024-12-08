import React from "react";
import { Text, View } from "react-native"

const TextoSimples = (props) => {
    return (
        <View>
            <Text>Olá, aula de dev mobile {props.nome}</Text>
        </View>
    )
}

export default TextoSimples;