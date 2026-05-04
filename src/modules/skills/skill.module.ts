import { Module } from "@nestjs/common";
import { skillModel, SkillRepository } from "src/common";
import { SkillServices } from "./skill.service";
import { SkillController } from "./skill.controller";

@Module({
    imports: [skillModel],
    providers: [SkillRepository, SkillServices],
    controllers:[SkillController]
})
export class SkillModule{}