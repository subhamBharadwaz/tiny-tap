import type { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user?: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
    role: string;
  };
  session?: any;
}
