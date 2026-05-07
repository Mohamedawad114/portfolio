import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { PinoLogger } from 'nestjs-pino';
import { AIPrompt } from './ai.prompt';
@Injectable()
export class AIServices implements OnModuleInit {
  private client!: Groq;
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {}
  onModuleInit() {
    const apiKey = this.configService.get<string>('GROQ_API');
    if (!apiKey) throw new BadRequestException('apiKey not found');
    this.client = new Groq({ apiKey: apiKey });
    this.logger.info('Groq connected successfully');
  }
  async generateStream(message, onChunk) {
    const stream = await this.client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: AIPrompt,
        },
          {
              role: 'user',
              content: message
        }
        ],
      temperature: 0.2,
      stream: true,
    });
    let fullReply = '';
    for await (const part of stream) {
      const chunk = part.choices[0]?.delta?.content;
      if (chunk) {
        fullReply += chunk;
        onChunk(chunk);
      }
    }
    return fullReply;
  }
}
