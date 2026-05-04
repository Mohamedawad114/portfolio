import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
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

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillServices) {}

  @Post('/add')
  @Auth()
  async addSkill(@Body() data: AddSkill) {
    return await this.skillService.addSkill(data);
  }
  @Put('/update/:id')
  @Auth()
  @HttpCode(200)
  async updateSkill(@Param('id') id: string, @Body() data: UpdateSkill) {
    return await this.skillService.updateSkill(data, new Types.ObjectId(id));
  }
  @Delete('/delete/:id')
  @Auth()
  async deleteSkill(@Param('id') id: string) {
    return await this.skillService.deleteSkill(new Types.ObjectId(id));
  }
  @Post('')
  @HttpCode(200)
  async getSkills(
    @Query('limit', ParseIntPipe, new DefaultValuePipe(1)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
  ) {
    return await this.skillService.getSkills(limit, page);
  }
  @Post('/:id')
  async getSkill(@Param('id') id: string) {
    return await this.skillService.getSkill(new Types.ObjectId(id));
  }
}
