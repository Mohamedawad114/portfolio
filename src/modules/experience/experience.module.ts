import { Module } from '@nestjs/common';
import { experienceModel, ExperienceRepository } from 'src/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';

@Module({
  imports: [experienceModel],
  providers: [ExperienceRepository, ExperienceService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
