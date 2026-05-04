import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './Base.repository';
import { Skill, SkillDocument} from '../models';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SkillRepository extends BaseRepository<SkillDocument> {
  constructor(
    @InjectModel(Skill.name)
    protected readonly skillModel: Model<SkillDocument>,
  ) {
    super(skillModel);
  }
}

