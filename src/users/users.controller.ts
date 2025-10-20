import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersInterceptor } from './users.interceptor';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() user: User) {
        return await this.usersService.createUser(user);
    }

    @Get()
    @UseInterceptors(UsersInterceptor)
    async getUsers() {
        return await this.usersService.getUsers();
    }
}
