import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './Base.repository';
import { Project, ProjectDocument, } from '../models';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class ProjectRepository extends BaseRepository<ProjectDocument> {
  constructor(
    @InjectModel(Project.name)
    protected readonly projectModel: Model<ProjectDocument>,
  ) {
    super(projectModel);
  }
}
