import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ExtractBearerTokenMiddleware implements NestMiddleware {
  use(req: any, _res: any, next: () => void) {
    const machineId = this.extractBearerToken(req);
    req.user = machineId;
    next();
  }

  extractBearerToken(req: Request) {
    let token = null;
    if (req && req.headers && req.headers.authorization) {
      const tokenParts = req.headers.authorization.split(' ');
      if (/^Bearer$/i.test(tokenParts[0])) {
        token = tokenParts[1];
      }
    }
    return token;
  }
}
