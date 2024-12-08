import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet } from 'react-native';

const EntradaDeTexto2 = () => {
    const [ texto , setTexto ] = useState('');
    const [ contador, setContadorAlteracao ] = useState(0);

    useEffect(() => {
        setContadorAlteracao(contador + 1)
    }, [texto])

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

            <Text style={styles.texto}
            >Numero de alterações: {contador}</Text>
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

export default EntradaDeTexto2;