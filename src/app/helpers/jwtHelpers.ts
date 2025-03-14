import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: string, // Ensure the type is `string` instead of `Secret`
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  } as SignOptions);
};

const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};


// export const verifyToken = (token: string, secret: string) => {
//   const newToken = token.includes('Bearer')
//     ? (token.split(' ')[1] as string)
//     : (token as string);
//   return jwt.verify(newToken, secret) as JwtPayload;
// };
