import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Protect the login route with LocalAuthGuard
  @Post('login')
  async login(@Request() req) {
    console.log('Backend Login function called');
    console.log('login: ', req.user);
    return this.authService.login(req.user); // Generate JWT token upon successful login
  }

  // Signup Route
  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    console.log('Backend Signup function called');

    console.log('signup: ', body);
    return this.authService.signup(body.username, body.password);
  }
}
