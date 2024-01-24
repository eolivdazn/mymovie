import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './interface/movie';
import { CreateRecommendationDto } from './dto/create-recommendation';
import { GetRecommendationDto } from './dto/get-recommendation';

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
  @Get('getInitialMovies')
  getInitialMovies(): Promise<Movie[]> {
    return this.moviesService.getRandomItems();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }
  @Post('recommendation')
  async insertRecommendation(
    @Body() createRecommendationDto: CreateRecommendationDto,
  ) {
    return this.moviesService.insertRecommendation(createRecommendationDto);
  }

  @Put('recommendation')
  async getRecommendation(@Body() getRecommendation: GetRecommendationDto) {
    console.log(getRecommendation, 'getRecommendation');
    const recommendation =
      await this.moviesService.findRecommendationByEmail(getRecommendation);

    const rec = recommendation.map(async (el) => {
      const data =  await this.moviesService.findOne(el.recommend as Number);
      return{
        movie: data,
        recommendationDate: el.date
      }
    });

    return await Promise.all(rec);
  }
}
