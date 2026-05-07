import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { AddEducation } from './Dto/addEducation.dto';
import { UpdateEducation } from './Dto/updateEducation.dto';
import { Types } from 'mongoose';
import { Auth } from 'src/common';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Auth()
  @Post('add')
  async create(@Body() data: AddEducation) {
    return await this.educationService.createEducation(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.educationService.getEducationById(new Types.ObjectId(id));
  }

  @Auth()
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateData: UpdateEducation) {
    return await this.educationService.updateEducation(
      new Types.ObjectId(id),
      updateData,
    );
  }

  @Auth()
  @Delete('/delete:id')
  async remove(@Param('id') id: string) {
    return await this.educationService.deleteEducation(new Types.ObjectId(id));
  }
}
