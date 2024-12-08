import React from "react";
import { View, Button, Text, Alert, TouchableOpacity } from "react-native";
import styles from "../styles";

const BotaoExemplo = () => {
    const showAlert = () => {
        Alert.alert("Botão precionado")
    };

    return (
        <View style={styles.container}>
            <Button title="Precione-me" onPress={showAlert}>
                <TouchableOpacity title="Precione-me" style={styles.button} onPress={showAlert}>
                    <Text style={styles.buttonText}>Botão Personalizado</Text>
                </TouchableOpacity>
            </Button>
        </View>
    )
}

export default BotaoExemplo;