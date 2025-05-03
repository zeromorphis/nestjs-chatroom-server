/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-11-22 11:02:28
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-06 10:48:31
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FriendModule } from './modules/friend/friend.module';
import { GroupModule } from './modules/group/group.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'chatroom',
      charset: "utf8mb4", // 设置chatset编码为utf8mb4
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    FriendModule,
    GroupModule,
    ChatModule
  ],
})
export class AppModule { }
