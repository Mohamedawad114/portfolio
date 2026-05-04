import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository, redis, redisKeys } from 'src/common';
import { AddContactInfo } from './Dto/addcontactInfo.dto';
import { UpdateContactInfo } from './Dto/updateContactInfo.dto';

@Injectable()
export class ContactService {
  constructor(private readonly ContactRepo: ContactRepository) {}
  addContactInfo = async (data: AddContactInfo) => {
    const isExist = await redis.hexists(redisKeys.contactInfo(), 'email');
    if (isExist) return { message: 'Contact Info already exists' };
    const contactInfo = await this.ContactRepo.create({ ...data });
    redis.hset(redisKeys.contactInfo(), {
      ...contactInfo,
    });
    return { message: 'Contact Info added successfully', data: contactInfo };
  };
  updateContactInfo = async (data: UpdateContactInfo) => {
    const isExist = await redis.hexists(redisKeys.contactInfo(), 'email');
    if (!isExist) throw new NotFoundException('Contact Info not found');
    const contactInfo = await this.ContactRepo.updateDocument({}, { ...data });
    await redis.hset(redisKeys.contactInfo(), { ...contactInfo });
    return { message: 'Contact Info updated successfully', data: contactInfo };
  };
  getContactInfo = async () => {
    const isExist = await redis.hgetall(redisKeys.contactInfo());
    if (isExist) return { message: 'Contact Info retrieved', data: isExist };
    const contactInfo = await this.ContactRepo.findOneDocument({});
    return {
      message: 'Contact Info retrieved successfully',
      data: contactInfo,
    };
  };
}
