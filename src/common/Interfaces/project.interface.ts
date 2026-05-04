import { Types } from "mongoose";

export interface IProject {
    name: string;
    description: string;
    Techs: Types.ObjectId[];
    githubLink: string;
    liveLink: string
}