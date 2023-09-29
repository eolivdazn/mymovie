import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class MovieDocument extends AbstractDocument {
    @Prop()
    adult: boolean;

    @Prop()
    backdrop_path: string;

    @Prop()
    genre_ids: number[];

    @Prop()
    id: number;

    @Prop()
    original_language: string;

    @Prop()
    original_title: string;

    @Prop()
    overview: string;

    @Prop()
    popularity: number;

    @Prop()
    poster_path: string;

    @Prop()
    release_date: string;

    @Prop()
    title: string;

    @Prop()
    video: boolean;

    @Prop()
    vote_average: number;

    @Prop()
    vote_count: number;

    @Prop()
    rating: number;
}

export const MovieSchema =
    SchemaFactory.createForClass(MovieDocument);
