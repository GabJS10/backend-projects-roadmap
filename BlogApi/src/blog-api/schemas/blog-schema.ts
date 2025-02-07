import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

@Schema()
export class Blog {
    @Prop({ unique: true,index: true, required: true })
    title: string;
    @Prop({ required: true })
    content: string;
    @Prop({ required: true })
    category: string;
    @Prop({ required: true, type: [String] })
    tags: string[];

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: Date.now() })
    updatedAt: Date;

}

export const BlogSchema = SchemaFactory.createForClass(Blog);
export type BlogDocument = Blog & Document;
export type BlogModel = Model<BlogDocument>;