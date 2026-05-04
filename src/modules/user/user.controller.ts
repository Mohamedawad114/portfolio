import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/common';
import { UpdateUserDto } from './Dto/updateUser.dto';
import { LoginDataDto } from './Dto/loginData.dto';
import { type Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() data: LoginDataDto, @Res() res: Response) {
    return await this.userService.login(data, res);
  }
  @Auth()
  @HttpCode(200)
  @Put('update')
  async updateData(@Body() data: UpdateUserDto) {
    return await this.userService.updateUser(data);
  }

  @HttpCode(200)
  @Get('')
  async userDate() {
    return await this.userService.getUserData();
  }
}
