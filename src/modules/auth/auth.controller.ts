/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-01 13:42:52
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-06 17:35:32
 */
import { Controller, Post, Get, Request, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLogin } from './dto/index.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('授权信息')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 登录测试
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiBody({ description: 'User Login', type: AuthLogin })
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/register')
  @ApiBody({ description: 'User Register', type: AuthLogin })
  @HttpCode(200)
  async register(@Request() req) {
    return this.authService.register(req.user);
  }


  @Get('nihao')
  @HttpCode(200)
  async getPermCode() {
    return Object.assign({ msg: '登录成功', data: '你好' });
  }
}
