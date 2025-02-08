import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';

const calcularIdade = (dataNascimento) => {
  const hoje = new Date();
  const data = new Date(dataNascimento);
  const idade = hoje.getFullYear() - data.getFullYear();
  const m = hoje.getMonth() - data.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < data.getDate())) {
    idade--;
  }
  return idade;
};

const regex = {
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  telefoneFixo: /^\(\d{2}\)\s\d{4}-\d{4}$/,
  celular: /^\(\d{2}\)\s9\d{4}-\d{4}$/,
  cep: /^\d{5}-\d{3}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  senha: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

const validationSchema = Yup.object().shape({
  nomeCompleto: Yup.string()
    .min(3, 'Nome completo deve ter pelo menos 3 caracteres')
    .required('Nome completo é obrigatório')
    .test('nome-completo', 'Nome completo deve conter pelo menos nome e sobrenome', (value) => value && value.split(' ').length >= 2),
  dataNascimento: Yup.string()
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Data de nascimento deve estar no formato DD/MM/AAAA'
    )
    .required('Data de nascimento é obrigatória')
    .test('idade', 'Você precisa ser maior de 18 anos', (value) => {
      const idade = calcularIdade(value);
      return idade >= 18;
    }),
  cpf: Yup.string()
    .matches(regex.cpf, 'CPF deve estar no formato XXX.XXX.XXX-XX')
    .required('CPF é obrigatório')
    .test('validar-cpf', 'CPF inválido', (value) => {
      const calcDigitos = (cpf) => {
        const cpfArray = cpf.split('').map(Number);
        const soma1 = cpfArray.slice(0, 9).reduce((acc, val, idx) => acc + val * (10 - idx), 0);
        const digito1 = (soma1 % 11 < 2 ? 0 : 11 - soma1 % 11);
        const soma2 = cpfArray.slice(0, 10).reduce((acc, val, idx) => acc + val * (11 - idx), 0);
        const digito2 = (soma2 % 11 < 2 ? 0 : 11 - soma2 % 11);
        return cpfArray[9] === digito1 && cpfArray[10] === digito2;
      };
      return calcDigitos(value.replace(/\D/g, ''));
    }),
  telefoneFixo: Yup.string()
    .matches(regex.telefoneFixo, 'Telefone fixo deve estar no formato (XX) XXXX-XXXX')
    .required('Telefone fixo é obrigatório'),
  celular: Yup.string()
    .matches(regex.celular, 'Celular deve estar no formato (XX) 9XXXX-XXXX')
    .required('Celular é obrigatório'),
  cep: Yup.string()
    .matches(regex.cep, 'CEP deve estar no formato XXXXX-XXX')
    .required('CEP é obrigatório'),
  email: Yup.string()
    .matches(regex.email, 'Email inválido')
    .required('Email é obrigatório'),
  senha: Yup.string()
    .matches(regex.senha, 'Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial')
    .required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], 'Senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
  nomePai: Yup.string().when('dataNascimento', {
    is: (dataNascimento) => calcularIdade(dataNascimento) < 18,
    then: Yup.string().required('Nome do Pai é obrigatório'),
  }),
  nomeMae: Yup.string().when('dataNascimento', {
    is: (dataNascimento) => calcularIdade(dataNascimento) < 18,
    then: Yup.string().required('Nome da Mãe é obrigatório'),
  }),
});

const Forms = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          nomeCompleto: '',
          dataNascimento: '',
          cpf: '',
          telefoneFixo: '',
          celular: '',
          cep: '',
          email: '',
          senha: '',
          confirmarSenha: '',
          nomePai: '',
          nomeMae: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Alert.alert('Formulário Enviado', JSON.stringify(values));
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            <TextInput
              style={[styles.input, touched.nomeCompleto && errors.nomeCompleto ? styles.inputError : null]}
              placeholder="Nome Completo"
              value={values.nomeCompleto}
              onChangeText={handleChange('nomeCompleto')}
              onBlur={handleBlur('nomeCompleto')}
            />
            {touched.nomeCompleto && errors.nomeCompleto && <Text style={styles.error}>{errors.nomeCompleto}</Text>}

            <TextInputMask
              style={[styles.input, touched.dataNascimento && errors.dataNascimento ? styles.inputError : null]}
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              value={values.dataNascimento}
              onChangeText={handleChange('dataNascimento')}
              onBlur={handleBlur('dataNascimento')}
            />
            {touched.dataNascimento && errors.dataNascimento && <Text style={styles.error}>{errors.dataNascimento}</Text>}

            <TextInputMask
              style={[styles.input, touched.cpf && errors.cpf ? styles.inputError : null]}
              placeholder="CPF"
              type={'cpf'}
              value={values.cpf}
              onChangeText={handleChange('cpf')}
              onBlur={handleBlur('cpf')}
            />
            {touched.cpf && errors.cpf && <Text style={styles.error}>{errors.cpf}</Text>}

            <TextInputMask
              style={[styles.input, touched.telefoneFixo && errors.telefoneFixo ? styles.inputError : null]}
              placeholder="Telefone Fixo"
              type={'custom'}
              options={{
                mask: '(99) 9999-9999',
              }}
              value={values.telefoneFixo}
              onChangeText={handleChange('telefoneFixo')}
              onBlur={handleBlur('telefoneFixo')}
            />
            {touched.telefoneFixo && errors.telefoneFixo && <Text style={styles.error}>{errors.telefoneFixo}</Text>}

            <TextInputMask
              style={[styles.input, touched.celular && errors.celular ? styles.inputError : null]}
              placeholder="Celular"
              type={'custom'}
              options={{
                mask: '(99) 9 9999-9999',
              }}
              value={values.celular}
              onChangeText={handleChange('celular')}
              onBlur={handleBlur('celular')}
            />
            {touched.celular && errors.celular && <Text style={styles.error}>{errors.celular}</Text>}

            <Text style={styles.sectionTitle}>Endereço</Text>
            <TextInputMask
              style={[styles.input, touched.cep && errors.cep ? styles.inputError : null]}
              placeholder="CEP"
              type={'custom'}
              options={{
                mask: '99999-999',
              }}
              value={values.cep}
              onChangeText={handleChange('cep')}
              onBlur={handleBlur('cep')}
            />
            {touched.cep && errors.cep && <Text style={styles.error}>{errors.cep}</Text>}

            <TextInput
              style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={[styles.input, touched.senha && errors.senha ? styles.inputError : null]}
              placeholder="Senha"
              secureTextEntry
              value={values.senha}
              onChangeText={handleChange('senha')}
              onBlur={handleBlur('senha')}
            />
            {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}

            <TextInput
              style={[styles.input, touched.confirmarSenha && errors.confirmarSenha ? styles.inputError : null]}
              placeholder="Confirmar Senha"
              secureTextEntry
              value={values.confirmarSenha}
              onChangeText={handleChange('confirmarSenha')}
              onBlur={handleBlur('confirmarSenha')}
            />
            {touched.confirmarSenha && errors.confirmarSenha && (
              <Text style={styles.error}>{errors.confirmarSenha}</Text>
            )}

            {calcularIdade(values.dataNascimento) < 18 && (
              <>
                <TextInput
                  style={[styles.input, touched.nomePai && errors.nomePai ? styles.inputError : null]}
                  placeholder="Nome do Pai"
                  value={values.nomePai}
                  onChangeText={handleChange('nomePai')}
                  onBlur={handleBlur('nomePai')}
                />
                {touched.nomePai && errors.nomePai && <Text style={styles.error}>{errors.nomePai}</Text>}

                <TextInput
                  style={[styles.input, touched.nomeMae && errors.nomeMae ? styles.inputError : null]}
                  placeholder="Nome da Mãe"
                  value={values.nomeMae}
                  onChangeText={handleChange('nomeMae')}
                  onBlur={handleBlur('nomeMae')}
                />
                {touched.nomeMae && errors.nomeMae && <Text style={styles.error}>{errors.nomeMae}</Text>}
              </>
            )}

            <Button title="Enviar" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default Forms;
