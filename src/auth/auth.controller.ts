import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDto } from './authBodyDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('login')
    async getAuth(@Body() authBody: AuthBodyDto) {
        const existingUser = await this.authService.login(authBody);

        return existingUser;
    }
}
