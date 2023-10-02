import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {RecommendationDocument} from "./models/recommendation.schema";

@Injectable()
export class RecommendationRepository extends AbstractRepository<RecommendationDocument> {
  protected readonly logger = new Logger(RecommendationRepository.name);

  constructor(
    @InjectModel(RecommendationDocument.name)
    RecommendationModel: Model<RecommendationDocument>,
  ) {
    super(RecommendationModel);
  }
}
