import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  //   @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // return req.user;
    return this.authService.login(req.user);
  }

  // @UseGuards(GoogleAuthGuard)
  @Get('auth/google-login')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Request() req) {
    // return req.user;
    // return req;
    // console.log('google login : ' + JSON.stringify(req));
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/auth/google/callback')
  async googleAuthRedirect(@Request() req) {
    // return req.user;
    // return req;
    // console.log('google login : ' + JSON.stringify(req));
    return this.authService.googleLogin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
