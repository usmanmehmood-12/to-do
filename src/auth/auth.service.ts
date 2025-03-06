import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude the password field
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Generate JWT using payload
    };
  }

  // Sign up (Register a new user)

  async signup(username: string, password: string) {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    console.log('In signup auth service');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser(
      username,
      hashedPassword,
    );

    const { password: _, ...result } = newUser; // Exclude the password from the result
    console.log(' SignUp result: ', result);
    return result;
  }
}
