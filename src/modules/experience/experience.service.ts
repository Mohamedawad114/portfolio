import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceRepository } from 'src/common';
import { AddExperience } from './Dto/addExperience.dto';
import { Types } from 'mongoose';
import { UpdateExperience } from './Dto/updateExperience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly experienceRepo: ExperienceRepository) {}

  async createExperience(data: AddExperience) {
    const experience = await this.experienceRepo.create({ ...data });
    return { message: 'experience added ', data: experience };
  }

  async getAllExperiences() {
    const experiences = await this.experienceRepo.findDocuments(
      {},
      {},
      { sort: { startDate: -1 } },
    );
    return { message: 'all experience', data: experiences };
  }

  async getExperienceById(id: Types.ObjectId) {
    const experience = await this.experienceRepo.findOneDocument({ _id: id });
    if (!experience) {
      throw new NotFoundException('Experience record not found');
    }
    return { message: 'experience data', data: experience };
  }

  async updateExperience(id: Types.ObjectId, updateData: UpdateExperience) {
    const updated = await this.experienceRepo.findAndUpdateDocument(id, {
      ...updateData,
    });
    if (!updated) {
      throw new NotFoundException('Experience not found to update');
    }
    return { message: 'experience updated', data: updated };
  }

  async deleteExperience(id: Types.ObjectId) {
    const result = await this.experienceRepo.deleteDocument({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Experience not found to delete');
    }

    return { message: 'Experience deleted successfully' };
  }
}
