import { PartialType } from '@nestjs/mapped-types';
import { AddExperience } from './addExperience.dto';

export class UpdateExperience extends PartialType(AddExperience) {}
