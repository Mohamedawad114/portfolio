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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDataDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() data: LoginDataDto, @Res({passthrough:true}) res: Response) {
    return await this.userService.login(data, res);
  }

  @Auth()
  @ApiBearerAuth()
  @HttpCode(200)
  @Put('update')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User data updated successfully' })
  async updateData(@Body() data: UpdateUserDto) {
    return await this.userService.updateUser(data);
  }

  @HttpCode(200)
  @Get('')
  @ApiOperation({ summary: 'Get user profile data' })
  @ApiResponse({ status: 200, description: 'User data retrieved successfully' })
  async userDate() {
    return await this.userService.getUserData();
  }
}
