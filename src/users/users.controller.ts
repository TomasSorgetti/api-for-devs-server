import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/users.schema';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }
    
    @Get()
    async getAllUsers(): Promise<User[]>{
            return this.userService.findAll()
    }
    @Post()
    async createUser(@Body() data : User): Promise<User>{
        return await this.userService.createUser(data)
    }
    // @Put(':id')
    // async updateUser(@Param('id') id: string, @Body() data: User) {
    //     return await this.userService.updateUser(Number(id),data)
    // }
    // @Delete('id')
    // async deleteUser(@Param('id') id: string) {
    //     return await this.userService.deleteUser(Number(id))
    // }
}
