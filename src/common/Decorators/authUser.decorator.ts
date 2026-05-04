import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../Interfaces';

export const AuthUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest<{ user: IUser }>().user;
  return user;
});
