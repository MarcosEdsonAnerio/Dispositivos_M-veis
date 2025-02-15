import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';

const CEPConsultation = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const consultarCEP = async () => {
    if (!cep || cep.length !== 9) {
      Alert.alert('Erro', 'Por favor, insira um CEP válido.');
      return;
    }

    setLoading(true);
    setError('');
    setEndereco(null);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
      if (response.data.erro) {
        setError('CEP não encontrado.');
      } else {
        setEndereco(response.data);
      }
    } catch (err) {
      setError('Erro ao consultar o CEP. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de CEP</Text>
      <TextInputMask
        style={styles.input}
        placeholder="Digite o CEP"
        type={'custom'}
        options={{
          mask: '99999-999',
        }}
        value={cep}
        onChangeText={setCep}
      />
      <Button title="Consultar" onPress={consultarCEP} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        endereco && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Logradouro: {endereco.logradouro}</Text>
            <Text style={styles.resultText}>Bairro: {endereco.bairro}</Text>
            <Text style={styles.resultText}>Cidade: {endereco.localidade}</Text>
            <Text style={styles.resultText}>Estado: {endereco.uf}</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CEPConsultation;