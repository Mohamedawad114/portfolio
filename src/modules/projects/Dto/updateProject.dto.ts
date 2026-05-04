import { PartialType } from '@nestjs/mapped-types';
import { AddProjectDto } from './addProject.dto';
export class UpdateProjectDto extends PartialType(AddProjectDto) {}
