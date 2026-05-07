import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { AddExperience } from './Dto/addExperience.dto';
import { UpdateExperience } from './Dto/updateExperience.dto';
import { Types } from 'mongoose';
import { Auth } from 'src/common';

@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Auth()
  @Post()
  async create(@Body() data: AddExperience) {
    return await this.experienceService.createExperience(data);
  }

  @Get()
  async findAll() {
    return await this.experienceService.getAllExperiences();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.experienceService.getExperienceById(
      new Types.ObjectId(id),
    );
  }

  @Auth()
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateData: UpdateExperience) {
    return await this.experienceService.updateExperience(
      new Types.ObjectId(id),
      updateData,
    );
  }

  @Auth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.experienceService.deleteExperience(
      new Types.ObjectId(id),
    );
  }
}
