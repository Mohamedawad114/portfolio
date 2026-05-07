import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './Base.repository';
import { Message, MessageDocument } from '../models/message.model';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepository extends BaseRepository<MessageDocument> {
  constructor(
    @InjectModel(Message.name)
    protected readonly messageModel: Model<MessageDocument>,
  ) {
    super(messageModel);
  }
}
