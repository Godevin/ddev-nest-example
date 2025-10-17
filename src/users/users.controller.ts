import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() user: User) {
        return await this.usersService.createUser(user);
    }

    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }
}
