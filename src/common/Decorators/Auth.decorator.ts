import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/authentication.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}
