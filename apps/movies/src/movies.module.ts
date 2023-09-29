import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {DatabaseModule, LoggerModule} from "@app/common";
import {MovieDocument, MovieSchema} from "./models/movies.schema";
import {MoviesRepository} from "./movies.repository";
import {ConfigModule} from "@nestjs/config";
import * as Joi from 'joi';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{
    name: MovieDocument.name, schema: MovieSchema
  }]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService ,MoviesRepository],
})
export class MoviesModule {}
