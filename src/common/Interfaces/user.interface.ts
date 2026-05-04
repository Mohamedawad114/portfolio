import { Types } from 'mongoose';
import { Gender } from '../enum/index';

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  password: string;
  dateBirth?: Date;
  profilePicture?: string;
  position: string;
  bio: string;
  CVLink: string;
  gender: Gender;
  aboutMe: string;
  slogan: string;
}
