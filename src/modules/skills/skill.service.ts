import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SkillRepository } from 'src/common/Repositories/skill.repository';
import { AddSkill } from './Dto/addSkill.dto';
import { UpdateSkill } from './Dto/updatedSKill.dto';
import { Types } from 'mongoose';
import { redis, redisKeys, redisTTl } from 'src/common';

@Injectable()
export class SkillServices {
  constructor(private readonly skillRepository: SkillRepository) {}
  addSkill = async (data: AddSkill) => {
    try {
      const skill = await this.skillRepository.create({ ...data });
      await redis.del(redisKeys.skills());
      return { message: 'Skill added successfully', data: skill };
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  };
  updateSkill = async (data: UpdateSkill, SKillId: Types.ObjectId) => {
    if (!SKillId) throw new NotFoundException('SkillId not found');
    try {
      const skill = await this.skillRepository.findAndUpdateDocument(SKillId, {
        ...data,
      });
      await redis.del(redisKeys.skills());
      return { message: 'Skill added successfully', data: skill };
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('skill name already exists');
      }
      throw error;
    }
  };
  deleteSkill = async (skillId: Types.ObjectId) => {
    if (!skillId) throw new NotFoundException('SkillId not found');
    const deletedSkill = await this.skillRepository.findAndUpdateDocument(
      skillId,
      { isDeleted: true },
    );
    if (!deletedSkill) throw new NotFoundException('Skill not found');
    await redis.del(redisKeys.skills());
    return { message: 'Skill deleted successfully', data: deletedSkill };
  };
  getSkills = async (limit: number, page: number) => {
    const offset= (page - 1) * limit
    const cached = await redis.get(redisKeys.skills(limit,page));
    if (cached) return JSON.parse(cached);
    const [total, skills] = await Promise.all([
      this.skillRepository.countDocuments({ isDeleted: false }),
      this.skillRepository.findDocuments(
        { isDeleted: false },
        { isDeleted: 0 },
        { sort: { createdAt: -1 }, limit: limit, skip:offset },
      ),
    ]);
    const res = {
      message: 'Skills retrieved successfully',
      data: skills,
      meta: {
        pages: Math.ceil(total / limit),
      },
    };
    await redis.setex(redisKeys.skills(), redisTTl.skills, JSON.stringify(res));
    return res;
  };
  getSkill = async (skillId: Types.ObjectId) => {
    if (!skillId) throw new NotFoundException('SkillId not found');
    const skill = await this.skillRepository.findOneDocument({
      isDeleted: false,
      _id: skillId,
    });
    if (!skill) throw new NotFoundException('skill not found');
    return {
      message: 'Skill retrieved successfully',
      data: skill,
    };
  };
}
