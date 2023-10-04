import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {DatabaseModule, HealthModule, LoggerModule} from "@app/common";
import {MovieDocument, MovieSchema} from "./models/movies.schema";
import {MoviesRepository} from "./movies.repository";
import {ConfigModule} from "@nestjs/config";
import * as Joi from 'joi';
import {RecommendationRepository} from "./recommendation.repository";
import {RecommendationDocument, RecommendationSchema} from "./models/recommendation.schema";

@Module({
  imports: [DatabaseModule,
    DatabaseModule.forFeature([{
    name: MovieDocument.name, schema: MovieSchema,
  }]),
    DatabaseModule.forFeature([{
      name: RecommendationDocument.name, schema: RecommendationSchema,
    }]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        IMDB: Joi.string().required(),
      }),
    }),
    HealthModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService ,MoviesRepository, RecommendationRepository],
})
export class MoviesModule {}
