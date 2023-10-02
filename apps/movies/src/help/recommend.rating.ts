import {MoviesRepository} from "../movies.repository";
import {Movie} from "../interface/movie";
import {getRecommendedMovies} from "./recommended.movies";
// import {getRecommendedMovies} from "./recommended.movies";

export async function recommendRating(likedMovies: number[] , repository: MoviesRepository) {

    const moviesData = await getRecommendedMovies(likedMovies, repository)
    console.log(moviesData,'moviesData')
}

    // const getRating = moviesData.map((movie) => movie.rating)
    // const sameGender = moviesData.map((movie) =>  movie.genre_ids)
    //  console.log(getRating)
    //  console.log(sameGender)

// }

