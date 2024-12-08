import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';
import TextInput2 from './Components/TextImput2';
import BotaoExemplo from './Components/BotaoExemplo';
import PokemonAPI from './Components/PokemonAPI';

export default function App() {
  return (
    <View style={styles.container}>
      <PokemonAPI></PokemonAPI>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
