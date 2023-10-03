import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import {Movie} from "../interface/movie";

@Schema({ versionKey: false })
export class RecommendationDocument extends AbstractDocument {
    @Prop()
    like: number[];

    @Prop()
    desLike: number[];

    @Prop()
    date: Date;

    @Prop()
    recommend: number;


}

export const RecommendationSchema =
    SchemaFactory.createForClass(RecommendationDocument);
