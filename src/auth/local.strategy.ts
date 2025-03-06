import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // Default field name for username
      passwordField: 'password', // Default field name for password
    });
  }

  async validate(username: string, password: string): Promise<any> {
    // Call the service method to validate the user
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user; // Return the user object if credentials are valid
  }
}
