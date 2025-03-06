import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Protect the login route with LocalAuthGuard
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user); // Generate JWT token upon successful login
  }

  // Signup Route
  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    return this.authService.signup(body.username, body.password);
  }
}
