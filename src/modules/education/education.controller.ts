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
import { EducationService } from './education.service';
import { AddEducation } from './Dto/addEducation.dto';
import { UpdateEducation } from './Dto/updateEducation.dto';
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

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Auth()
  @ApiBearerAuth()
  @Post('/add')
  @ApiOperation({ summary: 'Add new education record' })
  @ApiBody({ type: AddEducation })
  @ApiResponse({
    status: 201,
    description: 'Education record created successfully',
  })
  async create(@Body() data: AddEducation) {
    return await this.educationService.createEducation(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get education record ' })
  @ApiResponse({
    status: 200,
    description: 'Education record retrieved successfully',
  })
  async findOne() {
    return await this.educationService.getEducation();
  }

  @Auth()
  @ApiBearerAuth()
  @Put('update/:id')
  @ApiOperation({ summary: 'Update education record' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the education record',
    type: String,
  })
  @ApiBody({ type: UpdateEducation })
  @ApiResponse({
    status: 200,
    description: 'Education record updated successfully',
  })
  async update(@Param('id') id: string, @Body() updateData: UpdateEducation) {
    return await this.educationService.updateEducation(
      new Types.ObjectId(id),
      updateData,
    );
  }

  @Auth()
  @ApiBearerAuth()
  @Delete('/delete:id')
  @ApiOperation({ summary: 'Delete education record' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the education record',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Education record deleted successfully',
  })
  async remove(@Param('id') id: string) {
    return await this.educationService.deleteEducation(new Types.ObjectId(id));
  }
}
