import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddSkill } from './Dto/addSkill.dto';
import { SkillServices } from './skill.service';
import { Auth } from 'src/common';
import { Types } from 'mongoose';
import { UpdateSkill } from './Dto/updatedSKill.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Skills')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillServices) {}

  @Post('/add')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a new skill' })
  @ApiBody({ type: AddSkill })
  @ApiResponse({ status: 201, description: 'Skill added successfully' })
  async addSkill(@Body() data: AddSkill) {
    return await this.skillService.addSkill(data);
  }

  @Put('/update/:id')
  @Auth()
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Update an existing skill' })
  @ApiParam({ name: 'id', description: 'The ID of the skill', type: String })
  @ApiBody({ type: UpdateSkill })
  @ApiResponse({ status: 200, description: 'Skill updated successfully' })
  async updateSkill(@Param('id') id: string, @Body() data: UpdateSkill) {
    return await this.skillService.updateSkill(data, new Types.ObjectId(id));
  }

  @Delete('/delete/:id')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiParam({ name: 'id', description: 'The ID of the skill', type: String })
  @ApiResponse({ status: 200, description: 'Skill deleted successfully' })
  async deleteSkill(@Param('id') id: string) {
    return await this.skillService.deleteSkill(new Types.ObjectId(id));
  }
  @Get('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all skills with pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'List of skills retrieved successfully',
  })
  async getSkills(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.skillService.getSkills(limit, page);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a specific skill by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the skill', type: String })
  @ApiResponse({
    status: 200,
    description: 'Skill details retrieved successfully',
  })
  async getSkill(@Param('id') id: string) {
    return await this.skillService.getSkill(new Types.ObjectId(id));
  }
}
