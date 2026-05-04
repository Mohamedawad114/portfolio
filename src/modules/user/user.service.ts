import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './Dto/updateUser.dto';
import {
  HashingService,
  redis,
  redisKeys,
  TokenServices,
  UserRepository,
} from 'src/common';
import { LoginDataDto } from './Dto/loginData.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashingService,
    private readonly tokenService: TokenServices,
  ) {}

  login = async (data: LoginDataDto, res: Response) => {
    const user = await this.userRepo.findOneDocument(
      { username: data.username },
      { password: 1 },
    );
    const isMatch = await this.hashService.compare_hash(
      data.password,
      user!.password,
    );
    if (!isMatch) throw new BadRequestException('Invalid credentials');
    const access_token = await this.tokenService.generateTokens(
      { id: user!._id, username: user!.username },
      res,
    );
    return { message: 'Login successful', data: access_token };
  };
  updateUser = async (data: UpdateUserDto) => {
    const userUpdated = await this.userRepo.updateDocument({}, { ...data });
    await redis.set(redisKeys.User(), JSON.stringify(userUpdated));
    return { message: 'User updated successfully', data: userUpdated };
  };
  getUserData = async () => {
    const cached = await redis.get(redisKeys.User());
    if (cached) {
      return {
        message: 'User data retrieved from cache',
        data: JSON.parse(cached),
      };
    }
    const userUpdated = await this.userRepo.findOneDocument({});
    await redis.set(redisKeys.User(), JSON.stringify(userUpdated));
    return { message: 'User data retrieved successfully', data: userUpdated };
  };
}
