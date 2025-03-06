import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      ignoreExpiration: false, // Ensures expired JWT tokens are rejected
      secretOrKey: process.env.JWT_SECRET, // configService.get<string>('JWT_SECRET'), // Secret key to verify the JWT token
    });
  }

  async validate(payload: any) {
    // Validate the JWT payload, in this case, the user ID and username
    return { id: payload.sub, username: payload.username };
  }
}
