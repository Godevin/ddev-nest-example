import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find(); // Récupère tous les utilisateurs.
    }

    async getUser(userName: string): Promise<User|null> {
        const user = await this.userRepository.findOneBy({ ['userName'] : userName} );

        return user;
    }
    
    async createUser(user: User): Promise<string>{
        const userHashedPassword = await this.hashPassword(user.userPassword)

        try {
            await this.userRepository.save({...user, userPassword: userHashedPassword}) // Va insérer un utilisateur avec un mot de pass hashé.
            return `L'utilisateur ${user.userName} a été posté`
        } catch (error) {
            console.log("error ::::", error)
            throw new Error('Impossible de créer l\'utilisateur')
        }
    }

    private async hashPassword(password : string) {
        const hashedPassword = await hash(password, 9)
        return hashedPassword
    }
}
