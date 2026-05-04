import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PinoLogger } from 'nestjs-pino';
import { EmailServices } from '../../mailService/mail.service';

@Processor('email')
export class EmailWorker extends WorkerHost {
  constructor(
    private readonly logger: PinoLogger,
    private readonly emailServices: EmailServices,
  ) {
    super();
  }

  async process(job: Job) {
    const { name, email, subject, message } = job.data;
    await this.emailServices.sendMessage({ name, email, subject, message });
  }
  @OnWorkerEvent('completed')
  handleCompleted(job: Job) {
    this.logger.info(`Job ${job.id} completed successfully`);
  }

  @OnWorkerEvent('failed')
  handleFailed(job: Job, err: Error) {
    this.logger.error(`Job ${job.id} failed: ${err.message}`);
  }
}
