import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {Movie} from "./interface/movie";
import {CreateRecommendationDto} from "./dto/create-recommendation";

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
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }
  @Post('recommendation')
  async insertRecommendation(
      @Body() createRecommendationDto: CreateRecommendationDto,) {
    return this.moviesService.insertRecommendation(createRecommendationDto);
  }
}
