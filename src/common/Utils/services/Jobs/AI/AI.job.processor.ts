import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { redisPub } from '../../redis';
import { AIServices } from '../../AI/ai.service';

@Processor('AIAssistant', {
  limiter: {
    max: 2,
    duration: 30000,
  },
})
export class AIChatProcessor extends WorkerHost {
  constructor(
    private readonly aiServices: AIServices,
    private readonly logger: PinoLogger,
  ) {
    super();
  }

  async process(job: Job) {
    const { content ,convId} = job.data;
    const fullReply = await this.aiServices.generateStream(
      content,
      async (chunk) => {
        await redisPub.publish('chat-chunk', JSON.stringify({ chunk, convId }));
      },
    );

    await redisPub.publish('reply-done', JSON.stringify({ fullReply, convId }));
  }

  @OnWorkerEvent('completed')
  handleCompleted(job: Job) {
    this.logger.info({ jobId: job.id }, 'Job completed successfully');
  }

  @OnWorkerEvent('failed')
  handleFailed(job: Job, err: Error) {
    this.logger.error(
      { jobId: job.id, err, message: err?.message, stack: err?.stack },
      'Job failed',
    );
  }
}
