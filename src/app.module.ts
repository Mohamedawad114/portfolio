import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import {
  GlobalErrFilter,
  redis,
  ResponseInterceptor,
  TimeoutInterceptor,
  UserRepository,
} from './common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import {
  ContactInfoModule,
  ProjectsModule,
  SkillModule,
  UserModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../config/dev.env' }),
    BullModule.forRoot({ connection: redis }),
    MongooseModule.forRoot(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 30000,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        },
      },
    }),
    ProjectsModule,
    SkillModule,
    ContactInfoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserRepository,
    { provide: 'APP_INTERCEPTOR', useClass: ResponseInterceptor },
    { provide: 'APP_INTERCEPTOR', useClass: TimeoutInterceptor },
    { provide: 'APP_FILTER', useClass: GlobalErrFilter },
  ],
})
export class AppModule {}
