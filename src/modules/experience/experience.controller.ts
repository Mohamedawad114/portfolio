import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { AddExperience } from './Dto/addExperience.dto';
import { UpdateExperience } from './Dto/updateExperience.dto';
import { Types } from 'mongoose';
import { Auth } from 'src/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Experiences')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Auth()
  @ApiBearerAuth()
  @Post('add')
  @ApiOperation({ summary: 'Create a new experience' })
  @ApiBody({ type: AddExperience })
  @ApiResponse({ status: 201, description: 'Experience created successfully' })
  async create(@Body() data: AddExperience) {
    return await this.experienceService.createExperience(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experiences' })
  @ApiResponse({
    status: 200,
    description: 'List of experiences retrieved successfully',
  })
  async findAll() {
    return await this.experienceService.getAllExperiences();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an experience by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the experience',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Experience retrieved successfully',
  })
  async findOne(@Param('id') id: string) {
    return await this.experienceService.getExperienceById(
      new Types.ObjectId(id),
    );
  }

  @Auth()
  @ApiBearerAuth()
  @Put('update/:id')
  @ApiOperation({ summary: 'Update an experience' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the experience',
    type: String,
  })
  @ApiBody({ type: UpdateExperience })
  @ApiResponse({ status: 200, description: 'Experience updated successfully' })
  async update(@Param('id') id: string, @Body() updateData: UpdateExperience) {
    return await this.experienceService.updateExperience(
      new Types.ObjectId(id),
      updateData,
    );
  }

  @Auth()
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an experience' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the experience',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Experience deleted successfully' })
  async remove(@Param('id') id: string) {
    return await this.experienceService.deleteExperience(
      new Types.ObjectId(id),
    );
  }
}
