import { Types } from "mongoose";

export interface IToken {
  id:Types.ObjectId;
  username:string;
  role?:string;
}
export interface IDecodedToken extends IToken {
  jti:string
}