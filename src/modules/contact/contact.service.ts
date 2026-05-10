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
    redis.set(redisKeys.contactInfo(), JSON.stringify(contactInfo));
    return { message: 'Contact Info added successfully', data: contactInfo };
  };
  updateContactInfo = async (data: UpdateContactInfo) => {
    const contactInfo = await redis.get(redisKeys.contactInfo());
    if(!contactInfo) throw new NotFoundException('contact Info not found')
    const contact = JSON.parse(contactInfo);
    if (!contact._id) throw new NotFoundException('Contact Info not found');
    const contactInfoUpdated = await this.ContactRepo.findAndUpdateDocument(
      contact._id,
      {
        ...data,
      },
    );
    await redis.set(
      redisKeys.contactInfo(),
      JSON.stringify(contactInfoUpdated),
    );
    return { message: 'Contact Info updated successfully', data: contactInfoUpdated };
  };
  getContactInfo = async () => {
    const cached = await redis.get(redisKeys.contactInfo());
    if (cached) return {data: JSON.parse(cached) }
    const contactInfo = await this.ContactRepo.findOneDocument({});
    return {
      message: 'Contact Info retrieved successfully',
      data: contactInfo,
    };
  };
}
