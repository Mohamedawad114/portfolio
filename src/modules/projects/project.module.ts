import { Module } from '@nestjs/common';
import {
  projectModel,
  ProjectRepository,
  skillModel,
  SkillRepository,
} from 'src/common';
import { ProjectServices } from './project.service';
import { ProjectsController } from './project.controller';

@Module({
  imports: [projectModel, skillModel],
  providers: [SkillRepository, ProjectRepository, ProjectServices],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
