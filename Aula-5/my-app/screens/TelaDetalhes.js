import React from 'react';
import { View, Text, Button } from 'react-native';

function TelaDetalhes({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela de Detalhes</Text>
      <Button
        title="Voltar para Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default TelaDetalhes;