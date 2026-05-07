import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageData } from './Dto/message.dto';
import { Auth } from 'src/common';
import { Types } from 'mongoose';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('send')
  async sendMessage(@Body() data: MessageData) {
    return await this.messageService.sendMessage(data);
  }
  @Auth()
  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    return await this.messageService.getMessage(new Types.ObjectId(id));
  }
  @Auth()
  @Get('all')
  async allMessages(
    @Query('limit', ParseIntPipe, new DefaultValuePipe(1)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
  ) {
    return await this.messageService.allMessages(limit, page);
  }
}
