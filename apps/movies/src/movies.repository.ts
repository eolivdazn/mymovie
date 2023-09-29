import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {MovieDocument} from "./models/movies.schema";

@Injectable()
export class MoviesRepository extends AbstractRepository<MovieDocument> {
  protected readonly logger = new Logger(MoviesRepository.name);

  constructor(
    @InjectModel(MovieDocument.name)
    movieModel: Model<MovieDocument>,
  ) {
    super(movieModel);
  }
}
