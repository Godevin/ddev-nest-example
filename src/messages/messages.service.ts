import { Injectable } from '@nestjs/common';
import { MessagesDto } from 'src/models/messages.models';

@Injectable()
export class MessagesService {

  async getMessages(): Promise<string> {
        //logique métier qui va récupérer tous les messages en BDD
        return `tous les messages`
    }

    async getMessage(id : number): Promise<string> {
         //logique métier qui va récupérer l'id du message

        return `message avec l'id ${id}`
    }

    async postMessage(body: MessagesDto): Promise<string> {
        const { userId, userName, title, content } = body; 
        //logique pour post le message en bdd.
        return `ce message a été posté : ${content}`
    }
}
