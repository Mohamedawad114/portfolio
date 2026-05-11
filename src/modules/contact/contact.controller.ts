import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Auth } from 'src/common';
import { UpdateContactInfo } from './Dto/updateContactInfo.dto';
import { AddContactInfo } from './Dto/addContactInfo.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Contact Info')
@Controller('contactInfo')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/add')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add new contact information' })
  @ApiBody({ type: AddContactInfo })
  @ApiResponse({
    status: 201,
    description: 'Contact information added successfully',
  })
  async addContactInfo(@Body() data: AddContactInfo) {
    return await this.contactService.addContactInfo(data);
  }

  @Put('/update')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update existing contact information' })
  @ApiBody({ type: UpdateContactInfo })
  @ApiResponse({
    status: 200,
    description: 'Contact information updated successfully',
  })
  async updateContactInfo(@Body() data: UpdateContactInfo) {
    return await this.contactService.updateContactInfo(data);
  }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get contact information' })
  @ApiResponse({
    status: 200,
    description: 'Contact information retrieved successfully',
  })
  async getContactInfo() {
    return await this.contactService.getContactInfo();
  }
}
