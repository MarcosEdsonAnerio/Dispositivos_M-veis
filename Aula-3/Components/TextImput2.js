import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "../styles";


const TextInput2 = () => {
    const [name, setName] = useState("");

    return (
        <View>
            <TextInput placeholder="Digite Seu Nome" 
            onChangeText={ text => setName(text)}
            value={name}
            style={styles.text}/>

            <Text style={styles.text}> Bem Vindo, {name}</Text>
                
        </View>
    )
}

export default TextInput2;