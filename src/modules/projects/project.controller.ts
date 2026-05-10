import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectServices } from './project.service';
import { AddProjectDto } from './Dto';
import { Auth } from 'src/common';
import { Types } from 'mongoose';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { UpdateProjectDto } from './Dto/updateProject.dto';

@ApiTags('Projects')
@Controller('project')
export class ProjectsController {
  constructor(private readonly projectService: ProjectServices) {}

  @Auth()
  @ApiBearerAuth()
  @Post('/add')
  @ApiOperation({ summary: 'Add a new project' })
  @ApiBody({ type: AddProjectDto })
  @ApiResponse({ status: 201, description: 'Project added successfully' })
  async addProject(@Body() data: AddProjectDto) {
    return await this.projectService.addProject(data);
  }

  @Auth()
  @ApiBearerAuth()
  @HttpCode(200)
  @Put('/update/:id')
  @ApiOperation({ summary: 'Update an existing project' })
  @ApiParam({ name: 'id', description: 'The ID of the project', type: String })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  async updateProject(
    @Body() data: UpdateProjectDto,
    @Param('id') projectId: string,
  ) {
    return await this.projectService.updateProject(
      data,
      new Types.ObjectId(projectId),
    );
  }

  @Auth()
  @ApiBearerAuth()
  @HttpCode(200)
  @Post('/delete/:id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', description: 'The ID of the project', type: String })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  async deleteProject(@Param('id') projectId: string) {
    return await this.projectService.deleteProject(
      new Types.ObjectId(projectId),
    );
  }

  @Get('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'List of projects retrieved successfully',
  })
  async getProjects() {
    return await this.projectService.getAllProjects();
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get project details by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the project', type: String })
  @ApiResponse({
    status: 200,
    description: 'Project details retrieved successfully',
  })
  async getProjectDetails(@Param('id') projectId: string) {
    return await this.projectService.getProjectDetails(
      new Types.ObjectId(projectId),
    );
  }
}
