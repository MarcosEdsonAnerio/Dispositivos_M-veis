import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import JogoVelha from './screens/JogoVelha';
import Forms from './screens/Forms';
import Relogio from './screens/Relogio';
import QuizPerguntas from './screens//Quiz/QuizPerguntas';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="JogoVelha" component={JogoVelha} />
        <Stack.Screen name="Formulário" component={Forms} />
        <Stack.Screen name="Relogio" component={Relogio} />
        <Stack.Screen name="QuizPerguntas" component={QuizPerguntas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
