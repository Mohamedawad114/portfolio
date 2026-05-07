import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashingService } from 'src/common';

@Module({
  controllers: [UserController],
  providers: [UserService,HashingService],
})
export class UserModule {}
