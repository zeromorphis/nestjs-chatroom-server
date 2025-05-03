/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-01 13:42:52
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-02 14:06:55
 */
import { Controller, Get, Query, UseGuards, HttpCode } from '@nestjs/common';
import { FriendService } from './friend.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('好友信息')
@Controller('friend')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
  constructor(private readonly friendService: FriendService) { }

  @Get()
  @HttpCode(200)
  getFriends(@Query('userId') userId: string) {
    return this.friendService.getFriends(userId);
  }

  @Get('/friendMessages')
  @ApiQuery({
    name: 'userId',
    description: '用户ID',
  })
  @ApiQuery({
    name: 'friendId',
    description: '好友ID',
  })
  @ApiQuery({
    name: 'current',
    description: '分页数',
  })
  @ApiQuery({
    name: 'pageSize',
    description: '分页大小',
  })
  @HttpCode(200)
  getFriendMessage(@Query() query: any) {
    return this.friendService.getFriendMessages(query.userId, query.friendId, query.current, query.pageSize);
  }
}
