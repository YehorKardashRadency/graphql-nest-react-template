import { Injectable, NestMiddleware } from '@nestjs/common';
import { expressjwt as jwt } from 'express-jwt';
import { GetVerificationKey, expressJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  async use(req: any, res: any, next: () => void) {
    if (req.headers?.authorization) {
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${this.configService.getOrThrow(
            'AUTH0_DOMAIN'
          )}/.well-known/jwks.json`
        }) as GetVerificationKey,
        issuer: `https://${this.configService.getOrThrow('AUTH0_DOMAIN')}/`,
        audience: this.configService.getOrThrow('AUTH0_AUDIENCE'),
        algorithms: ['RS256']
      })(req, res, (err) => {
        if (err) {
          const status = err.status || 500;
          const message =
            err.message || 'Sorry we were unable to process your request.';
          return res.status(status).send({
            message
          });
        }
        next();
      });
    } else {
      next();
    }
  }
}
