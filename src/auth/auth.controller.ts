import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDto } from './authBodyDto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // On envoie le username et le mot de passe.
    // On récupère un JWT token.
    @Post('login')
    async getAuth(@Body() authBody: AuthBodyDto) {
        const existingUser = await this.authService.login(authBody);

        return existingUser;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return this.authService.getProfile(req.user.userName)
    }
}
