import {MoviesRepository} from "../movies.repository";
import {getSelectedMoviesData} from "./getSelectedMoviesData";
import {findDuplicates} from "./findDuplicates";

export async function moviesLikedAnalysis(selectedMovies: number[] , repository: MoviesRepository) {

    const moviesData = await getSelectedMoviesData(selectedMovies, repository)

    let sameRating = moviesData.map((movie) => movie.rating)
    let sameGender =  moviesData.map((movie) =>  movie.genre_ids).flat()
    let sameCast = moviesData.map((movie) => movie.cast).flat().map((cast) => cast.name)
    let sameCrew =
        moviesData.map((movie) => movie.crew.map((el=>
        el.name))).map((crew) => [...new Set(crew)]).flat()

    if (selectedMovies.length >1) {
        sameRating = findDuplicates(sameRating).length > 0 ? findDuplicates(sameRating) : sameRating
        sameGender = findDuplicates(sameGender)
        sameCast = findDuplicates(sameCast).length > 0 ? findDuplicates(sameCast) : sameCast.slice(0, 4)
        sameCrew = findDuplicates(sameCrew).length > 0 ? findDuplicates(sameCrew) : sameCrew.slice(0, 4)
    }
    // console.log(sameRating)
    // console.log(sameGender)
    // console.log(sameCast)
    // console.log(sameCrew)

    return{
        recommendRating: sameRating,
        recommendGender: sameGender,
        recommendCast: sameCast.slice(0, 4),
        recommendCrew: sameCrew.slice(0, 4),
    }



}

