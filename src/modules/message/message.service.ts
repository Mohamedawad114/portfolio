import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmailProducer, MessageRepository } from 'src/common';
import { MessageData } from './Dto/message.dto';
import { Types } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepo: MessageRepository,
    private readonly emailProducer: EmailProducer,
  ) {}

  sendMessage = async (data: MessageData) => {
    const message = await this.messageRepo.create({ ...data });
    await this.emailProducer.sendEmailJob({
      email: data.senderEmail,
      name: data.senderName,
      message: data.message,
    });
    return { message: 'Message sent successfully', data: message };
  };
  getMessage = async (messageId: Types.ObjectId) => {
    if (!messageId) throw new BadRequestException('Message id is required');
    const message = await this.messageRepo.findOneDocument({ _id: messageId });
    if (!message) throw new NotFoundException('Message not found');
    return { message: 'Message retrieved successfully', data: message };
  };
  allMessages = async (limit: number, page: number) => {
    const [total, messages] = await Promise.all([
      this.messageRepo.countDocuments({}),
      this.messageRepo.findDocuments(
        {},
        { message: 0 },
        { limit, skip: (page - 1) * limit },
      ),
    ]);
    return {
      message: 'Messages retrieved successfully',
      data: messages,
      meta: {
        total,
        pages: Math.ceil(total / limit),
      },
    };
  };
}
