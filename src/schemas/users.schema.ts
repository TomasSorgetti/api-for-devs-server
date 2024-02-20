import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from './posts.schema'; 


@Schema({ timestamps: true })
export class User extends Document {
    @Prop()
    name: string;
    
    @Prop()
    username: string;
    
    @Prop()
    email: string;

    @Prop({ type: [{ type: 'ObjectId', ref: 'Post' }] })
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);