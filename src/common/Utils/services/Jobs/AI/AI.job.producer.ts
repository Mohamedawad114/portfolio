import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';


@Injectable()
export class AIChatProducer {
  constructor(@InjectQueue('AIAssistant') private readonly AIQueue: Queue) {}
  chat = async (content: string,convId:string) => {
    await this.AIQueue.add(
      'chat',
      {
        content,
        convId
      },
      {
        attempts: 1,
        removeOnFail: false,
        removeOnComplete: true,
      },
    );
  };
}
