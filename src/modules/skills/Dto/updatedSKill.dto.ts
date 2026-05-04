import { PartialType } from "@nestjs/mapped-types";
import { AddSkill } from "./addSkill.dto";

export class UpdateSkill extends PartialType(AddSkill){}