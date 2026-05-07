import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './Base.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Education, EducationDocument } from '../models/education.model';

@Injectable()
export class EducationRepository extends BaseRepository<EducationDocument> {
  constructor(
    @InjectModel(Education.name)
    protected readonly educationModel: Model<EducationDocument>,
  ) {
    super(educationModel);
  }
}
