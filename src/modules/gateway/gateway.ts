import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PinoLogger } from 'nestjs-pino';
import { Server, Socket } from 'socket.io';
import { AIChatProducer, redisSub } from 'src/common';
import { OnModuleInit } from '@nestjs/common';
import { MessageDto } from './Dto/messageData.dto';
import { v4 as uuid } from 'uuid';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Chat Gateway')
@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
    
  },
  transports: ['websocket', 'polling'],
})
export class chatGateway
  implements
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    OnModuleInit
{
  @WebSocketServer() server!: Server;
  constructor(
    private readonly logger: PinoLogger,
    private readonly aiChatQueue: AIChatProducer,
  ) {}
  afterInit(server: any) {
    this.logger.info('websocket initialized');
  }
  async handleConnection(client: Socket) {
    try {
      const convId = uuid();
      client.join(convId.toString());
      client.data.convId = convId.toString();
      this.logger.info(`client connected: ${client.id}`);
    } catch (error: unknown) {
      this.logger.error(`Connection error: ${error}`);
      client.disconnect();
    }
  }
  async handleDisconnect(client: Socket) {
    try {
      client.disconnect();
      this.logger.info('client disconnect');
    } catch (error) {
      this.logger.error(`client err:${error}`);
      client.disconnect();
    }
  }
  @SubscribeMessage('send-message')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageDto,
  ) {
    const { content } = data;

    this.aiChatQueue.chat(content, client.data.convId);
  }
  onModuleInit() {
    const subscriber = redisSub.duplicate();
    subscriber.subscribe('chat-chunk', 'reply-done', (err, count) => {
      this.logger.info(`Subscribed to ${count} channels`);
      if (err) this.logger.error(`Subscribe error: ${err}`);
    });
    subscriber.on('message', (channel, message) => {
      const data = JSON.parse(message);
      if (channel === 'chat-chunk') {
        const { chunk, convId } = data;
        this.server.to(convId).emit('stream', {
          convId,
          chunk,
        });
      }
      if (channel === 'reply-done') {
        const { convId, fullReply } = data;
        this.server.to(convId).emit('done', { fullReply });
      }
    });
  }
}
