import {MoviesRepository} from "../movies.repository";
import {getSelectedMoviesData} from "./getSelectedMoviesData";
import {findDuplicates} from "./findDuplicates";
import { analysisResultDto } from "../interface/analysisResult";
import { getGenreName } from "./generMap";


export async function moviesLikedAnalysis(selectedMovies: number[] , repository: MoviesRepository): Promise<analysisResultDto> {


    const moviesData = await getSelectedMoviesData(selectedMovies, repository)
    // console.log(moviesData,"moviesData")

    let sameRating = moviesData.map((movie) => movie.rating)
    let sameGener =  moviesData.map((movie) =>  movie.genre_ids).flat()
    let sameCast = moviesData.map((movie) => movie.cast).flat().map((cast) => cast.name)
    let sameCrew =
        moviesData.map((movie) => movie.crew.map((el=>
        el.name))).map((crew) => [...new Set(crew)]).flat()

    if (selectedMovies.length >1) {
        sameRating = findDuplicates(sameRating).length > 0 ? findDuplicates(sameRating) : sameRating
        sameGener = findDuplicates(sameGener)
        sameCast = findDuplicates(sameCast).length > 0 ? findDuplicates(sameCast) : sameCast.slice(0, 4)
        sameCrew = findDuplicates(sameCrew).length > 0 ? findDuplicates(sameCrew) : sameCrew.slice(0, 4)
    }
    return{
        notRecommendId: selectedMovies,
        recommendRating: sameRating,
        recommendGender: getGenreName(sameGener),
        recommendCast: sameCast.slice(0, 4),
        recommendCrew: sameCrew.slice(0, 4),
    }
}

