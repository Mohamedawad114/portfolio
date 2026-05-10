import { Module } from '@nestjs/common';
import { chatGateway } from './gateway';
import { AIJobModule } from 'src/common';

@Module({
  imports: [AIJobModule],
  providers: [chatGateway],
})
export class GatewayModule {}
