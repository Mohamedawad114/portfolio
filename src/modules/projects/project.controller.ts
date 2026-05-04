import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ProjectServices } from './project.service';
import { AddProjectDto } from './Dto';
import { Auth } from 'src/common';
import { Types } from 'mongoose';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectServices) {}
  @Auth()
  @Post('/add')
  async addProject(@Body() data: AddProjectDto) {
    return await this.projectService.addProject(data);
  }
  @Auth()
  @HttpCode(200)
  @Put('/update/:id')
  async updateProject(@Body() data: AddProjectDto, @Param('id') projectId: string) {
    return await this.projectService.updateProject(
      data,
      new Types.ObjectId(projectId),
    );
  }
  @Auth()
  @HttpCode(200)
  @Post('/delete/:id')
  async deleteProject(@Param('id') projectId: string) {
    return await this.projectService.deleteProject(
      new Types.ObjectId(projectId),
    );
  }
  @Post('')
  @HttpCode(200)
  async getProjects() {
    return await this.projectService.getAllProjects();
  }
  @Get('/:id')
  @HttpCode(200)
  async getProjectDetails(@Param('id') projectId: string) {
    return await this.projectService.getProjectDetails(
      new Types.ObjectId(projectId),
    );
  }
}
