import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/Repositories/user.repository';
import { UpdateUserDto } from './Dto/updateUser.dto';
import { redis, redisKeys } from 'src/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

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
