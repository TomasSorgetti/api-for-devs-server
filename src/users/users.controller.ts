import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/users.schema';
import { Query as ExpressQuery } from 'express-serve-static-core'



@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    
    @Get()
    async getAllUsers(@Query() query: ExpressQuery): Promise<User[]>{
        return this.userService.findAll(query)
    }
    
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User>{
        return this.userService.findUser(id)
    }
        
    @Post()
    async createUser(@Body() data: User, @Query() query : ExpressQuery): Promise<User>{
        return await this.userService.createUser(data,query)
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Query() query: ExpressQuery, @Body() data: User): Promise<User>{
        return await this.userService.updateUser(id,query,data)
    }    
        
    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Query() query : ExpressQuery) {
        return await this.userService.deleteUser(id,query)
    }
}
