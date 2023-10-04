import {Injectable} from '@nestjs/common';
import {MoviesRepository} from "./movies.repository";
import {Movie} from "./interface/movie";
import {Cast} from "./interface/cast";
import {Crew} from "./interface/crew";
import {RecommendationRepository} from "./recommendation.repository";
import {CreateRecommendationDto} from "./dto/create-recommendation";
import {moviesLikedAnalysis} from "./help/moviesLikedAnalysis";

const API_KEY = process.env.API_KEY

@Injectable()
export class MoviesService {

    constructor(private readonly moviesRepository: MoviesRepository,
                private readonly recommendationRepository: RecommendationRepository) {
    }

    async getCasts(id: number) {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }
        };

        const result =  await fetch(url, options)
        return await result.json()

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
                    Authorization: `Bearer ${API_KEY}`
                }
            };

            const result = await fetch(url, options)
            const moviesList = await result.json()

            for (const movie of moviesList.results as Movie[]) {
              const {cast,crew} = await this.getCasts(movie.id)
                await this.moviesRepository.create({...movie, id_themoviedb: movie.id,
                    cast: cast as Cast[],
                    crew: crew as Crew[]
                });
            }
        }
    }

    async getAllMovies() {
        return this.moviesRepository.find({})
    }

    async getRandomItems() {
        return this.moviesRepository.findRandom()
    }

    async findOne(id: string) {
        return this.moviesRepository.find({id_themoviedb: Number(id)})
    }

    async insertRecommendation(createRecommendationDto: CreateRecommendationDto) {
       if(createRecommendationDto.like.length >= 1) {
           console.log('like')
          const likedProperties =  await moviesLikedAnalysis(createRecommendationDto.like, this.moviesRepository)
          console.log(likedProperties)
//db.moviedocuments.find({ "genre_ids": { "$in": [80, 53, 18] }, rating: 7 },{rating:1,genre_ids:2, title:3, release_date:4, vote_average:5, id_themoviedb:6 }).sort({release_date: -1})
           const bdRecommendation = await this.moviesRepository.find({
                rating: {$in: likedProperties.recommendRating},
                genre_ids: {$in: likedProperties.recommendGender},
                cast: {$elemMatch: {name: {$in: likedProperties.recommendCast}}},
           })

           bdRecommendation.splice(bdRecommendation.findIndex(movie =>
               createRecommendationDto.like.includes(Number(movie.id_themoviedb ||
                   createRecommendationDto.desLike.includes(movie.id_themoviedb)))),1);

           console.log(bdRecommendation,'empty')

           if (bdRecommendation.length > 0) {
           await this.recommendationRepository.create({
                like: createRecommendationDto.like,
                desLike: createRecommendationDto.desLike,
               recommend: bdRecommendation[0].id_themoviedb,
               date: new Date()
           })
               return [bdRecommendation[0]]
           }else
                return false


       }
    }

}
