import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import { PinoLogger } from 'nestjs-pino';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from 'config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new PinoLogger({
    pinoHttp: {},
    renameContext: 'nestContext',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(
    helmet({
      crossOriginOpenerPolicy: false,
    }),
    hpp(),
    cookieParser(),
  );
  (app.enableCors({
    origin: [
"http://localhost:5173",
      process.env.FRONTEND_URL_PROD as string,
    ],
    credentials: true,
  }),
    app.setGlobalPrefix('api'));
  const Doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, Doc);
  logger.info(`server is running... on 3000`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
