import { Injectable, NotFoundException } from '@nestjs/common';
import { EducationRepository } from 'src/common';
import { Types } from 'mongoose';
import { AddEducation } from './Dto/addEducation.dto';
import { UpdateEducation } from './Dto/updateEducation.dto';

@Injectable()
export class EducationService {
  constructor(private readonly educationRepo: EducationRepository) {}

  async createEducation(data: AddEducation) {
    const education = await this.educationRepo.create({ ...data });
    return { message: 'education added', data: education };
  }

  async getEducation() {
    const education = await this.educationRepo.findOneDocument({});
    if (!education) {
      throw new NotFoundException('Education record not found');
    }
    return { message: 'education data', data: education };
  }

  async updateEducation(id: Types.ObjectId, updateData: UpdateEducation) {
    const updated = await this.educationRepo.findAndUpdateDocument(id, {
      ...updateData,
    });
    if (!updated) {
      throw new NotFoundException('Education not found to update');
    }
    return { message: 'education updated', data: updated };
  }

  async deleteEducation(id: Types.ObjectId) {
    const result = await this.educationRepo.deleteDocument({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Education not found to delete');
    }
    return { message: 'education deleted successfully' };
  }
}
