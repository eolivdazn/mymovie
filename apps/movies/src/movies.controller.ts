import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {Movie} from "./interface/movie";

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('syncDatabase')
  syncDatabase(): Promise<void> {
    return this.moviesService.createData();
  }
  @Get('getAllMovies')
  getAllMovies(): Promise<any> {
    return this.moviesService.getAllMovies();
  }
  @Get()
  getInitialMovies(): Promise<Movie[]> {
    return this.moviesService.getRandomItems();
  }
}
