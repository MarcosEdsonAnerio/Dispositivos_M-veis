import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Procurar from './screens/procurar';
import Detalhes from './screens/detalhes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={Procurar} options={{ title: 'Buscar Filmes' }} />
        <Stack.Screen name="Detail" component={Detalhes} options={{ title: 'Detalhes do Filme' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;