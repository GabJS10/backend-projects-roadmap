import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Schema()
export class Url {

    @Prop({required:true, unique:true, index:true})
    url:string


    @Prop({required:true})
    shortCode:string

    @Prop({default:Date.now()})
    createdAt:Date


    @Prop({default:Date.now()})
    updatedAt:Date


    @Prop({default:0})
    accessCount:number
}

export const UrlSchema = SchemaFactory.createForClass(Url)
export type UrlDocument = Url & Document
export type UrlModel = Model<UrlDocument>