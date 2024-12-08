import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from 'react-native';

const EntradaDeTexto = () => {
    const [ texto, setTexto ] = useState('');
      
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                placeholder="Digite algo aqui..."
                onChangeText={ novoTexto => setTexto(novoTexto)}
                value={texto}
            />

            <Text style={styles.texto}
            >Você digitou: {texto}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:20
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10  
    },
    texto: {
        fontSize: 18
    }
})

export default EntradaDeTexto