import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Post } from "src/posts/schemas/posts.schema";



@Schema({
    timestamps: true
})

export class User extends Document{

    @Prop()
    name: string
    
    @Prop()
    username: string
    
    @Prop()
    email: string

    @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Post' }] })
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);