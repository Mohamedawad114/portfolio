import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageData } from './Dto/message.dto';
import { Auth } from 'src/common';
import { Types } from 'mongoose';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a new message' })
  @ApiBody({ type: MessageData })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  async sendMessage(@Body() data: MessageData) {
    return await this.messageService.sendMessage(data);
  }

  @Auth()
  @ApiBearerAuth()
  @Get('/:id')
  @ApiOperation({ summary: 'Get a specific message by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the message', type: String })
  @ApiResponse({ status: 200, description: 'Message retrieved successfully' })
  async getMessage(@Param('id') id: string) {
    return await this.messageService.getMessage(new Types.ObjectId(id));
  }

  @Auth()
  @ApiBearerAuth()
  @Get('all')
  @ApiOperation({ summary: 'Get all messages with pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Paginated messages retrieved successfully',
  })
  async allMessages(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.messageService.allMessages(limit, page);
  }
}
