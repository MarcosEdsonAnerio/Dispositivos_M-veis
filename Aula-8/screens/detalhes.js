import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { TMDB_API_KEY } from '@env';

const Detalhes = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
        setMovie(response.data);
      } catch (err) {
        setError('Erro ao carregar detalhes do filme.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
      </View>

      <Text style={styles.title}>{movie.title}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Data de Lançamento: {movie.release_date}</Text>
        <Text style={styles.infoText}>Avaliação: {movie.vote_average}/10</Text>
        <Text style={styles.infoText}>Duração: {movie.runtime} minutos</Text>
      </View>

      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Sinopse</Text>
        <Text style={styles.overviewText}>{movie.overview}</Text>
      </View>

      <View style={styles.genresContainer}>
        <Text style={styles.genresTitle}>Gêneros</Text>
        <View style={styles.genresList}>
          {movie.genres.map((genre) => (
            <Text key={genre.id} style={styles.genre}>
              {genre.name}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  posterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 300,
    height: 450,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  overviewContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  overviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  genresContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  genresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genre: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: '#e9ecef',
    borderRadius: 15,
    color: '#333',
  },
});

export default Detalhes;