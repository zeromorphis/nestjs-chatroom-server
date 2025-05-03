/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-11-24 10:54:25
 * @LastEditors: 言棠
 * @LastEditTime: 2022-11-24 10:55:01
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Group, GroupMap } from '../group/entity/group.entity';
import { GroupMessage } from '../group/entity/groupMessage.entity';
import { UserMap } from '../friend/entity/friend.entity';
import { FriendMessage } from '../friend/entity/friendMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group, GroupMap, GroupMessage, UserMap, FriendMessage])
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
