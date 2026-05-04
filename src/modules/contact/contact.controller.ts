import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AddContactInfo } from './Dto/addcontactInfo.dto';
import { Auth } from 'src/common';
import { UpdateContactInfo } from './Dto/updateContactInfo.dto';

@Controller('contactInfo')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/add')
  @Auth()
  async addContactInfo(@Body() data: AddContactInfo) {
    return await this.contactService.addContactInfo(data);
  }
  @Put('/update')
  @Auth()
  async updateContactInfo(data: UpdateContactInfo) {
    return await this.contactService.updateContactInfo(data);
  }
  @Get('/')
  @HttpCode(200)
  async getContactInfo() {
    return await this.contactService.getContactInfo();
  }
}
