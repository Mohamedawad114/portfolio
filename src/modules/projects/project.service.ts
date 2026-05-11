import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ProjectRepository,
  redis,
  redisKeys,
  redisTTl,
  SkillRepository,
} from 'src/common';
import { AddProjectDto } from './Dto';
import { UpdateProjectDto } from './Dto/updateProject.dto';
import { Types } from 'mongoose';

@Injectable()
export class ProjectServices {
  constructor(
    private readonly projectRepo: ProjectRepository,
    private readonly skillRepo: SkillRepository,
  ) {}
  addProject = async (data: AddProjectDto) => {
    const { Techs = [] } = data;
    const skillIds = Array.from(new Set(Techs.map((id) => id.toString())));
    const objectIds = skillIds.map((id) => new Types.ObjectId(id));
    const skills = await this.skillRepo.findDocuments(
      {
        _id: { $in: objectIds },
      },
      { _id: 1 },
    );
    if (skills.length !== objectIds.length)
      throw new NotFoundException('One or more skills not found');
    try {
      const project = await this.projectRepo.create({
        ...data,
        Techs: objectIds,
      });
      if (!project) throw new NotFoundException('Project creation failed');
      await redis.del(redisKeys.projects());
      return { message: 'Project created successfully', data: project };
    } catch (error) {
      throw error instanceof ConflictException
        ? new ConflictException('Project name already exists')
        : error;
    }
  };
  updateProject = async (data: UpdateProjectDto, projectId: Types.ObjectId) => {
    const { Techs = [], ...updateDate } = data;
    let TechsIds: Types.ObjectId[] = [];
    if (Techs.length) {
      const skillIds = Array.from(new Set(Techs.map((id) => id.toString())));
      const objectIds = skillIds.map((id) => new Types.ObjectId(id));
      const skills = await this.skillRepo.findDocuments(
        {
          _id: { $in: objectIds },
        },
        { _id: 1 },
      );
      if (skills.length !== objectIds.length)
        throw new NotFoundException('One or more skills not found');
      TechsIds = objectIds;
    }
    try {
      const project = await this.projectRepo.findAndUpdateDocument(projectId, {
        $set: updateDate,
        ...(TechsIds.length && { $addToSet: { Techs: { $each: TechsIds } } }),
      });
      if (!project) throw new NotFoundException('Project update failed');
      await redis.del(redisKeys.projects());
      return { message: 'Project updated successfully', data: project };
    } catch (error) {
      throw error;
    }
  };
  deleteProject = async (projectId: Types.ObjectId) => {
    if (!projectId) throw new NotFoundException('ProjectId not found');
    const deleted = await this.projectRepo.deleteDocument(
      { _id: projectId },
    );
    if (!deleted.deletedCount)
      throw new NotFoundException('Project deletion failed');
    await redis.del(redisKeys.projects());
    return { message: 'Project deleted successfully' };
  };
  getProjectDetails = async (projectId: Types.ObjectId) => {
    if (!projectId) throw new NotFoundException('ProjectId not found');
    const project = await this.projectRepo.findOneDocument(
      { _id: projectId },
      {},
      { populate: 'Techs' },
    );
    if (!project) throw new NotFoundException('Project not found');
    return { message: 'Project details retrieved successfully', data: project };
  };
  getAllProjects = async () => {
    const cached = await redis.get(redisKeys.projects());
    if (cached)
      return {
        message: 'Projects retrieved successfully',
        data: JSON.parse(cached),
      };
    const projects = await this.projectRepo.findDocuments(
      {},
      {},
      { sort: { createdAt: -1 }, populate: 'Techs' },
    );
    await redis.setex(
      redisKeys.projects(),
      redisTTl.projects,
      JSON.stringify(projects),
    );
    return { message: 'Projects retrieved successfully', data: projects };
  };
}
