import {Injectable} from '@nestjs/common';
import {MoviesRepository} from "./movies.repository";
import {Movie} from "./interface/movie";
import {Cast} from "./interface/cast";

const API_KEY = process.env.API_KEY

@Injectable()
export class MoviesService {

    constructor(private readonly moviesRepository: MoviesRepository) {
    }

    async getCasts(id: number) {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjIyMWU0MWZkZjAwNTJiODhlMWRmMTBjODEwYWI1MCIsInN1YiI6IjY0ZDM5YTlhZGQ5MjZhMDFlYjE4ZTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._mZ4FA3xW8-0aT4zDkdwZn1jgi8UQJkDOeAxXC8drnE`
            }
        };

        const result =  await fetch(url, options)
        const cast = await result.json()
        return cast.cast

    }

    async createData() {

        for (let i = 1; i < 32; i++) {
            await new Promise(f => setTimeout(f, 1000));
            console.log(i)
            const url = `https://api.themoviedb.org/3/account/20280298/rated/movies?language=en-US&page=${i}&sort_by=created_at.asc`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjIyMWU0MWZkZjAwNTJiODhlMWRmMTBjODEwYWI1MCIsInN1YiI6IjY0ZDM5YTlhZGQ5MjZhMDFlYjE4ZTI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._mZ4FA3xW8-0aT4zDkdwZn1jgi8UQJkDOeAxXC8drnE`
                }
            };

            const result = await fetch(url, options)
            const moviesList = await result.json()

            for (const movie of moviesList.results as Movie[]) {
              const cast = await this.getCasts(movie.id)
                await this.moviesRepository.create({...movie, id_themoviedb: movie.id, cast: cast as Cast[]});
            }
        }
    }

    async getAllMovies() {
        return this.moviesRepository.find({})
    }

    async getRandomItems() {
        return this.moviesRepository.findRandom()
    }
}
