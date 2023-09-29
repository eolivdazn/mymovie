import { Injectable } from '@nestjs/common';
import {MoviesRepository} from "./movies.repository";
import {Movie} from "./interface/movie";

@Injectable()
export class MoviesService {

constructor(private readonly moviesRepository: MoviesRepository) {
}

const totalItems = 584

  async createData(){

  for (let i = 0; i < 31; i++) {
    await new Promise(f => setTimeout(f, 1000));
    console.log(i)
    const url = `https://api.themoviedb.org/3/account/20280298/rated/movies?language=en-US&page=${i}&sort_by=created_at.asc`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjIyMWU0MWZkZjAwNTJiODhlMWRmMTBjODEwYWI1MCIsInN1YiI6IjY0ZDM5YTlhZGQ5MjZhMDFlYjE4ZTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._mZ4FA3xW8-0aT4zDkdwZn1jgi8UQJkDOeAxXC8drnE'
      }
    };

    const result = await fetch(url, options)
    const moviesList = await result.json()

    moviesList.results?.forEach( (movie: Movie) => {
      return this.moviesRepository.create(movie)
    })
  }
  }
  async getAllMovies(){
    return this.moviesRepository.find({})
  }
}
