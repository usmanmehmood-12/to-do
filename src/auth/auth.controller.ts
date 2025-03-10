import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Protect the login route with LocalAuthGuard
  @Post('login')
  /**
   * Handles user login.
   * @param req The request object containing the authenticated user.
   * @returns A promise that resolves with an object containing the JWT access token.
   */
  async login(@Request() req) {
    return this.authService.login(req.user); // Generate JWT token upon successful login
  }

  // Signup Route
  @Post('signup')
  /**
   * Handles user signup.
   * @param body The request body containing the username and password for the new user.
   * @returns A promise that resolves with the newly created user object, excluding the password.
   * @throws ConflictException if the username already exists.
   */
  async signup(@Body() body: { username: string; password: string }) {
    return this.authService.signup(body.username, body.password);
  }
}
