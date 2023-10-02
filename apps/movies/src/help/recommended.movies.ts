import {MoviesRepository} from "../movies.repository";

export async function getRecommendedMovies(likedMovies: number[], repository: MoviesRepository) {
    const results = await Promise.all(
        likedMovies.map(id => repository.find({ id_themoviedb: Number(id) }))
    );
    return await results.flat();
}
