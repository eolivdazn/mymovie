import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('syncDatabase')
  syncDatabase(): Promise<void> {
    return this.moviesService.createData();
  }
  @Get('getAllMovies')
  getAllMovies(): Promise<void> {
    return this.moviesService.getAllMovies();
  }
  @Get()
  getInitialMovies(): Promise<void> {
    return this.moviesService.createData();
  }
}
