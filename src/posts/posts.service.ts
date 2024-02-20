import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from 'src/schemas/posts.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name)
        private postsModel: mongoose.Model<Post>
    ) {         
    }
}
