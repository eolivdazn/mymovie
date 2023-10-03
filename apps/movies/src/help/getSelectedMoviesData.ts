import {MoviesRepository} from "../movies.repository";

export async function getSelectedMoviesData(recommendedMovies: number[], repository: MoviesRepository) {
    const results = await Promise.all(
        recommendedMovies.map(id => repository.find({ id_themoviedb: Number(id) }))
    );
    return await results.flat();
}
