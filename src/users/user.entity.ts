import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    userId: string
    
    @Column({ unique: true })
    userName: string

    @Column()
    userPassword: string
}