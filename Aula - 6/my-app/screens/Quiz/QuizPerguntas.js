import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import perguntas from './perguntas.json';  // Importando o arquivo JSON

export default function QuizPerguntas() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Função para iniciar o quiz com perguntas do JSON
  const startQuiz = () => {
    setIsQuizStarted(true);
    setQuestions(perguntas);  // Carregando as perguntas locais
  };

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setIsQuizStarted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Finalizado!</Text>
        <Text style={styles.scoreText}>Sua pontuação: {score} de {questions.length}</Text>
        <Button title="Reiniciar Quiz" onPress={restartQuiz} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isQuizStarted ? (
        <>
          <Text style={styles.title}>Quiz de Perguntas</Text>
          <Button title="Iniciar Quiz" onPress={startQuiz} />
        </>
      ) : (
        questions.length > 0 && (
          <>
            <Text style={styles.title}>Pergunta {currentQuestionIndex + 1} de {questions.length}</Text>
            <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>

            {[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer]
              .sort(() => Math.random() - 0.5)
              .map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.answerButton}
                  onPress={() => handleAnswer(answer)}
                >
                  <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
              ))
            }
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  answerButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 10,
    marginBottom: 10,
  },
  answerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  }
});
