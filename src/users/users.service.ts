import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/users.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }
    async findAll(): Promise<User[]>{
        return await this.userModel.find()
    }
    async createUser(data:User): Promise<User>{
        return await this.userModel.create(data)
    }
    // async updateUser(id:number, data:User): Promise<User>{
    //     return await this.userModel.updateOne({where:{id},data})
    // }
}
