import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import {User} from "./users.schema"




@Schema({
    timestamps: true
})

export class Post extends Document{

    @Prop()
    title: string

    @Prop()
    body: string

    @Prop({ type: [{ type: 'ObjectId', ref: 'User' }] })
    user: User;

}

export const PostSchema = SchemaFactory.createForClass(Post);