import { Module } from '@nestjs/common';
import { educationModel } from 'src/common/models/education.model';
import { EducationService } from './education.service';
import { EducationRepository } from 'src/common';

@Module({
  imports: [educationModel],
  providers: [EducationService, EducationRepository],
  controllers: [],
})
export class EducationModule {}
