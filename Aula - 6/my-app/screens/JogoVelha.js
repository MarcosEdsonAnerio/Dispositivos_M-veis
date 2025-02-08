import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const verificarVencedor = (tabuleiro) => {
  const combinacoes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let i = 0; i < combinacoes.length; i++) {
    const [a, b, c] = combinacoes[i];
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return tabuleiro[a];
    }
  }
  return null;
};

const verificarEmpate = (tabuleiro) => {
  return tabuleiro.every(celula => celula !== null);
};

const minimax = (tabuleiro, depth, isMaximizing) => {
  const vencedor = verificarVencedor(tabuleiro);
  if (vencedor === 'X') return -10 + depth;
  if (vencedor === 'O') return 10 - depth;
  if (verificarEmpate(tabuleiro)) return 0;

  const jogadasDisponiveis = tabuleiro.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
  
  if (isMaximizing) {
    let melhorPontuacao = -Infinity;
    for (let i = 0; i < jogadasDisponiveis.length; i++) {
      tabuleiro[jogadasDisponiveis[i]] = 'O';
      let pontuacao = minimax(tabuleiro, depth + 1, false);
      tabuleiro[jogadasDisponiveis[i]] = null;
      melhorPontuacao = Math.max(melhorPontuacao, pontuacao);
    }
    return melhorPontuacao;
  } else {
    let melhorPontuacao = Infinity;
    for (let i = 0; i < jogadasDisponiveis.length; i++) {
      tabuleiro[jogadasDisponiveis[i]] = 'X';
      let pontuacao = minimax(tabuleiro, depth + 1, true);
      tabuleiro[jogadasDisponiveis[i]] = null;
      melhorPontuacao = Math.min(melhorPontuacao, pontuacao);
    }
    return melhorPontuacao;
  }
};

const melhorMovimento = (tabuleiro) => {
  let melhorPontuacao = -Infinity;
  let movimento;
  
  const jogadasDisponiveis = tabuleiro.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
  
  for (let i = 0; i < jogadasDisponiveis.length; i++) {
    tabuleiro[jogadasDisponiveis[i]] = 'O';
    let pontuacao = minimax(tabuleiro, 0, false);
    tabuleiro[jogadasDisponiveis[i]] = null;
    if (pontuacao > melhorPontuacao) {
      melhorPontuacao = pontuacao;
      movimento = jogadasDisponiveis[i];
    }
  }
  return movimento;
};

const JogoVelha = () => {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [jogadorAtual, setJogadorAtual] = useState('X');
  const [gameOver, setGameOver] = useState(false);

  const alternarJogador = () => {
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
  };

  const jogar = (index) => {
    if (tabuleiro[index] || gameOver) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[index] = jogadorAtual;
    setTabuleiro(novoTabuleiro);

    const vencedor = verificarVencedor(novoTabuleiro);
    if (vencedor) {
      setGameOver(true);
      Alert.alert(`${vencedor} venceu!`);
      return;
    }

    if (verificarEmpate(novoTabuleiro)) {
      setGameOver(true);
      Alert.alert('Empate!');
      return;
    }

    alternarJogador();
  };

  const jogarBot = () => {
    if (gameOver || jogadorAtual === 'X') return;

    const movimento = melhorMovimento(tabuleiro);
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[movimento] = 'O';
    setTabuleiro(novoTabuleiro);

    const vencedor = verificarVencedor(novoTabuleiro);
    if (vencedor) {
      setGameOver(true);
      Alert.alert(`${vencedor} venceu!`);
      return;
    }

    if (verificarEmpate(novoTabuleiro)) {
      setGameOver(true);
      Alert.alert('Empate!');
      return;
    }

    alternarJogador();
  };

  if (jogadorAtual === 'O' && !gameOver) {
    setTimeout(jogarBot, 500);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <View style={styles.tabuleiro}>
        {tabuleiro.map((valor, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.celula}
            onPress={() => jogar(index)}
          >
            <Text style={styles.textoCelula}>{valor}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {gameOver && (
        <TouchableOpacity style={styles.reiniciarButton} onPress={() => {
          setTabuleiro(Array(9).fill(null));
          setJogadorAtual('X');
          setGameOver(false);
        }}>
          <Text style={styles.reiniciarText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Appzinho</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  tabuleiro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
  },
  celula: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  textoCelula: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  reiniciarButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  reiniciarText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
});

export default JogoVelha;
