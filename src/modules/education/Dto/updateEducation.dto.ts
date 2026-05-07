import { PartialType } from '@nestjs/mapped-types';
import { AddEducation } from './addEducation.dto';

export class UpdateEducation extends PartialType(AddEducation) {}
