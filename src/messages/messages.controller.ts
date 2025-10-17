import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import type { MessagesDto } from 'src/models/messages.models';


@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}

    @Get()
    async getMessages(@Param('id') id : string) {
        const data = await this.messageService.getMessages();

        return data
    }

    @Get(":id")
    async getMessage(@Param('id', ParseIntPipe) id : number) {
        const data = await this.messageService.getMessage(id);

        return data
    }

    @Post()
    async postMessage(@Body('body') body: MessagesDto) {
        const data = await this.messageService.postMessage(body)
    }
}
