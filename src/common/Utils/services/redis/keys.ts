export const redisKeys = {
  refreshToken: (userId: string, jti: string) =>
    `refreshToken_${userId}:${jti}`,
  OTP: (email: string) => `otp_${email}`,
  resetPassword: (email: string) => `otp_reset:${email}`,
  projects: () => `user_projects`,
  skills: () => `user_skills`,
  User: () => `user_data`,
  contactInfo: () => `user_contactInfo`,
  idempotencyKey: (key: string, op: string, id: number) =>
    `idempotencyKey:${key}:${op}:${id}`,
};
export const redisTTl = {
  projects: 60 * 60 * 24,
  skills: 60 * 60 * 24,
};
