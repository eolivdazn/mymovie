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

    @Prop()
    email?: string;


}

export const RecommendationSchema =
    SchemaFactory.createForClass(RecommendationDocument);
