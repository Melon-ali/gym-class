import { JwtPayload } from 'jsonwebtoken';
import * as nodeFetch from 'node-fetch';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

declare module "*.json" {
  const value: unknown;
  export default value;
}

declare global {
  const fetch: typeof nodeFetch.default;
  type RequestInit = nodeFetch.RequestInit;
  type Response = nodeFetch.Response;
}
