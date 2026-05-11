import { DocumentBuilder } from '@nestjs/swagger';
export const config = new DocumentBuilder()
  .setTitle('Portfolio')
  .setDescription('REST API for managing my Portfolio.')
  .setVersion('1.0')
  .addServer('http://localhost:3000')
  .build();
