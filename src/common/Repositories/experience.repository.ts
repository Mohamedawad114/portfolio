import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './Base.repository';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from '../models';

@Injectable()
export class ExperienceRepository extends BaseRepository<ExperienceDocument> {
  constructor(
    @InjectModel(Experience.name)
    protected readonly experienceModel: Model<ExperienceDocument>,
  ) {
    super(experienceModel);
  }
}
