import { JwtPayload } from "src/auth/type";

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload; // attach user type
  }
}