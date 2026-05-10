import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import {
  CommonModule,
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
  EducationModule,
  ExperienceModule,
  GatewayModule,
  MessageModule,
  ProjectsModule,
  SkillModule,
  UserModule,
} from './modules';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve('config/dev.env'),
      isGlobal: true,
    }),
    BullModule.forRoot({ connection: redis }),
    MongooseModule.forRoot(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 3000,
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
    CommonModule,
    ProjectsModule,
    SkillModule,
    ContactInfoModule,
    UserModule,
    MessageModule,
    ExperienceModule,
    EducationModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_INTERCEPTOR', useClass: ResponseInterceptor },
    { provide: 'APP_INTERCEPTOR', useClass: TimeoutInterceptor },
    { provide: 'APP_FILTER', useClass: GlobalErrFilter },
  ],
})
export class AppModule {}
