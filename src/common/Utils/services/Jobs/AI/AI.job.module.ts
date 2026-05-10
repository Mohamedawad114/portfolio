import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AIChatProducer } from './AI.job.producer';
import { AIChatProcessor } from './AI.job.processor';
import { AiServiceModule } from '../../AI/ai.module';
@Module({
  imports: [
    AiServiceModule,
    BullModule.registerQueue({
      name: 'AIAssistant',
    }),
  ],
  providers: [
    AIChatProducer,
    AIChatProcessor,
  ],
  exports: [AIChatProducer],
})
export class AIJobModule {}
