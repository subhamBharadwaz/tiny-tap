import type { Response, NextFunction, RequestHandler } from 'express';
import { auth } from "@/lib/auth";
import APIError from "@/lib/utils/classes/apiError";
import type { IGetUserAuthInfoRequest } from "@/modules/auth/auth.type";
import { HttpStatusCode } from "@/types/http.model";

const convertHeaders = (incomingHeaders: any): Headers => {
  const headers = new Headers();
  
  for (const [key, value] of Object.entries(incomingHeaders)) {
    if (value !== undefined) {
      // Handle array values (multiple headers with same name)
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, String(v)));
      } else {
        headers.set(key, String(value));
      }
    }
  }
  
  return headers;
};

export const requireRoles = (...roles: string[]): RequestHandler => {
  return async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
      // Convert Express headers to Web API Headers
      const webHeaders = convertHeaders(req.headers);
      
      const session = await auth.api.getSession({
        headers: webHeaders,
      });

      if (!session) {
        const message = 'Authentication required';
        return next(new APIError(message, 'requireRoles', HttpStatusCode.UNAUTHORIZED));
      }

      req.user = session.user;
      req.session = session.session;

      const userRole = session.user.role;
      if (!roles.includes(userRole)) {
        const message = `Access denied. Required role(s): ${roles.join(', ')}, Current: ${userRole}`;
        return next(new APIError(message, 'requireRoles', HttpStatusCode.FORBIDDEN));
      }

      next();
    } catch (error) {
      console.error('Auth/Role validation error:', error);
      const message = 'Authorization failed';
      return next(new APIError(message, 'requireRoles', HttpStatusCode.INTERNAL_SERVER));
    }
  };
};
