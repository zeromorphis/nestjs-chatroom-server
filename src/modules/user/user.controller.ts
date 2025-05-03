/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-01 13:42:52
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-02 14:07:13
 */
import { Controller, Post, Get, Body, Query, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateUser, UserUpdateAvatar } from './dto/index.dto';
import { ApiTags, ApiBody, ApiQuery, ApiHeader } from '@nestjs/swagger';

@ApiTags('用户信息')
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @HttpCode(200)
  getUsers(@Query('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Post()
  @HttpCode(200)
  postUsers(@Body('userIds') userIds: string) {
    return this.userService.postUsers(userIds);
  }

  @Patch('username')
  @ApiHeader({
    name: 'token',
    required: true,
    description: '本次请求请带上token',
  })
  @ApiBody({ description: 'User UpdateUserName', type: UserUpdateUser })
  @HttpCode(200)
  updateUserName(@Body() user) {
    return this.userService.updateUserName(user);
  }

  @Patch('password')
  @ApiHeader({
    name: 'token',
    required: true,
    description: 'token',
  })
  @ApiQuery({
    name: 'password',
    description: '密码',
  })
  @ApiBody({ description: 'User UpdatePassword', type: UserUpdateUser })
  @HttpCode(200)
  updatePassword(@Body() user, @Query('password') password) {
    return this.userService.updatePassword(user, password);
  }

  @Patch('/jurisdiction/:userId')
  @HttpCode(200)
  jurisdiction(@Param('userId') userId) {
    return this.userService.jurisdiction(userId);
  }

  @Delete()
  @ApiQuery({
    name: 'uid',
    description: '自己的userId',
  })
  @ApiQuery({
    name: 'psw',
    description: '密码',
  })
  @ApiQuery({
    name: 'did',
    description: '被删除userId',
  })
  @HttpCode(200)
  delUser(@Query() { uid, psw, did }) {
    return this.userService.delUser(uid, psw, did);
  }

  @Get('/findByName')
  @ApiQuery({
    name: 'username',
    description: '用户名',
  })
  @HttpCode(200)
  getUsersByName(@Query('username') username: string) {
    return this.userService.getUsersByName(username);
  }

  @Post('/avatar')
  @ApiHeader({
    name: 'token',
    required: true,
    description: '本次请求请带上token',
  })
  @ApiBody({ description: 'User Avatar', type: UserUpdateAvatar })
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(200)
  setUserAvatar(@Body() user, @UploadedFile() file) {
    return this.userService.setUserAvatar(user, file);
  }

}
