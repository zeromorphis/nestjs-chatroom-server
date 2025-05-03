/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-01 13:42:52
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-02 14:06:23
 */
import { Controller, Post, Get, Body, Query, UseGuards, HttpCode } from '@nestjs/common';
import { GroupService } from './group.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('群组信息')
@Controller('group')
@UseGuards(AuthGuard('jwt'))
export class GroupController {
  constructor(private readonly groupService: GroupService) { }


  @Post()
  @HttpCode(200)
  postGroups(@Body('groupIds') groupIds: string) {
    return this.groupService.postGroups(groupIds);
  }

  @Get('/userGroup')
  @HttpCode(200)
  getUserGroups(@Query('userId') userId: string) {
    return this.groupService.getUserGroups(userId);
  }

  @Get('/groupUser')
  @HttpCode(200)
  getGroupUsers(@Query('groupId') groupId: string) {
    return this.groupService.getGroupUsers(groupId);
  }

  @Get('/findByName')
  @ApiQuery({
    name: 'groupName',
    description: '群组名称',
  })
  @HttpCode(200)
  getGroupsByName(@Query('groupName') groupName: string) {
    return this.groupService.getGroupsByName(groupName);
  }

  @Get('/groupMessages')
  @ApiQuery({
    name: 'groupId',
    description: '群组ID',
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
  getGroupMessages(@Query('groupId') groupId: string, @Query('current') current: number, @Query('pageSize') pageSize: number) {
    return this.groupService.getGroupMessages(groupId, current, pageSize);
  }
}
