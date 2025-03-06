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
  /**
   * Injects the UsersService and JwtService into the AuthService.
   * @param usersService The service used to interact with the users repository.
   * @param jwtService The service used to generate and verify JWT tokens.
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates a user's credentials.
   * @param username The username to validate.
   * @param password The password to validate.
   * @returns A promise that resolves with the user object if the credentials are valid. Otherwise, throws an error.
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude the password field
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Generates a JWT access token for an authenticated user.
   * @param user The authenticated user object.
   * @returns An object containing the JWT access token.
   */

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Generate JWT using payload
    };
  }

  // Sign up (Register a new user)

  /**
   * Registers a new user in the system.
   * @param username The desired username for the new user.
   * @param password The desired password for the new user.
   * @throws ConflictException if the username already exists.
   * @returns An object excluding the password, containing details of the newly created user.
   */

  async signup(username: string, password: string) {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser(
      username,
      hashedPassword,
    );

    const { password: _, ...result } = newUser; // Exclude the password from the result
    return result;
  }
}
