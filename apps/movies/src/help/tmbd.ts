// File: apps/movies/src/help/fetchMovieById.ts
import axios from 'axios';

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjIyMWU0MWZkZjAwNTJiODhlMWRmMTBjODEwYWI1MCIsInN1YiI6IjY0ZDM5YTlhZGQ5MjZhMDFlYjE4ZTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._mZ4FA3xW8-0aT4zDkdwZn1jgi8UQJkDOeAxXC8drnE"
const TMDB_API_KEY = API_KEY;

export async function fetchMovieById(movieId: number) {
  console.log(movieId)
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching movie by ID:', error.response?.data || error.message);
    throw new Error('Failed to fetch movie from TMDb');
  }
}