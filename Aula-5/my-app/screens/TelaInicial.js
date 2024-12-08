import React from 'react';
import { View, Text, Button } from 'react-native';

function TelaInicial({ navigation }) {
  return (
    <View style={{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
        }}>
      <Text>Tela Inicial</Text>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Detalhes')}
      />
    </View>
  );
}

export default TelaInicial;
