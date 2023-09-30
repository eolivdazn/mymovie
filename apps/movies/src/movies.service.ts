import { Injectable } from '@nestjs/common';
import {MoviesRepository} from "./movies.repository";
import {Movie} from "./interface/movie";
const API_KEY = process.env.API_KEY
@Injectable()
export class MoviesService {

constructor(private readonly moviesRepository: MoviesRepository) {
}
  async createData(){

  for (let i = 0; i < 31; i++) {
    await new Promise(f => setTimeout(f, 1000));
    console.log(i)
    const url = `https://api.themoviedb.org/3/account/20280298/rated/movies?language=en-US&page=${i}&sort_by=created_at.asc`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    const result = await fetch(url, options)
    const moviesList = await result.json()

    moviesList.results?.forEach( (movie: Movie) => {
      return this.moviesRepository.create({...movie, id_themoviedb: movie.id})
    })
  }
  }
  async getAllMovies(){
    return this.moviesRepository.find({})
  }
  async getRandomItems(){
    return this.moviesRepository.findRandom()
  }
}
