import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './authBodyDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }

    async getProfile(userName: string) {
        const user = await this.userService.getUser(userName)

        if (!user) throw new NotFoundException('Utilisateur non trouvé')
        
        return { userName : user.userName, userId: user.userId }    
    }

    async login(authBody: AuthBodyDto) {
        const { userName, userPassword } = authBody;

        const existingUser = await this.userService.getUser(userName);
        
        if (!existingUser) throw new UnauthorizedException({error: "Mot de passe ou nom d'utilisateur incorrecte"})
        
        const isPasswordValid = await this.isPasswordValid(userPassword, existingUser.userPassword)
        if (!isPasswordValid) throw new UnauthorizedException({error: "Mot de passe ou nom d'utilisateur incorrecte"})    

        return this.authentificateUser({ userId: existingUser.userId })
    }

    // Fonction permettant de vérifier un mot de passe haché.
    private async isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword)
    }

    //Fonction qui gère le JWT
    private async authentificateUser({userId} : {userId: string}) {
        const payload = { userId }
        return { access_token : this.jwtService.sign(payload)}
    }
}
