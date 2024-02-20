import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/users.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'



@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }

    //******* GET all Users ********/
    async findAll(query: Query): Promise<User[]>{
        const limit = Number(query.limit) || 3
        const currentPage = Number(query.page) || 1
        const skip = limit * (currentPage - 1)

        return await this.userModel.find().limit(limit).skip(skip)
    }
    
    //******* GET User By Id ********/
    async findUser(id: string): Promise<User>{
        const user = await this.userModel.findById(id)
        if (!user) {
        throw new NotFoundException('User not found');
    }
    return user;
    }

    //******* Create a User ********/
    async createUser(data: User, query: Query): Promise<User>{
        const key = process.env.KEY
        if (key !== query.key) {            
            throw new ForbiddenException("Access deny")
        }
        const findUser = await this.userModel.findOne({ email: data.email })
        if (!findUser) return await this.userModel.create(data)
        else throw new BadRequestException("email already exist")
    }
    

    //******* Delete a User ********/
    async updateUser(id: string, query: Query,data:User) {
        const key = process.env.KEY
        if (key !== query.key) {            
            throw new ForbiddenException("Access deny")
        }
        return await this.userModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators:true
        })
    }

    //******* Delete a User ********/
    async deleteUser(id: string, query: Query) {
        const key = process.env.KEY
        if (key !== query.key) {            
            throw new ForbiddenException("Access deny")
        }
        return await this.userModel.findByIdAndDelete(id)
    }
}
