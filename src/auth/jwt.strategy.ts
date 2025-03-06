import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates a new instance of the JWT strategy.
   * @constructor
   *
   * This constructor sets the JWT strategy options:
   * - `jwtFromRequest`: Extracts the JWT token from the Authorization header.
   * - `ignoreExpiration`: Ensures expired JWT tokens are rejected.
   * - `secretOrKey`: The secret key to verify the JWT token.
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      ignoreExpiration: false, // Ensures expired JWT tokens are rejected
      secretOrKey: process.env.JWT_SECRET, // configService.get<string>('JWT_SECRET'), // Secret key to verify the JWT token
    });
  }

  /**
   * Validates the JWT payload, in this case, the user ID and username.
   * @param payload The JWT payload to validate.
   * @returns An object containing the user ID and username if the payload is valid.
   */
  async validate(payload: any) {
    // Validate the JWT payload, in this case, the user ID and username
    return { id: payload.sub, username: payload.username };
  }
}
