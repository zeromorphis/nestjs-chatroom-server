/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-02 11:36:33
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-02 13:55:43
 */
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateUser {
  @ApiProperty({
    description: '用户ID',
  })
  userId: string;

  @ApiProperty({
    description: '用户名',
  })
  username: string;

  @ApiProperty({
    description: '密码',
  })
  password: string;

  @ApiProperty({
    description: '头像',
  })
  avatar: string;

  @ApiProperty({
    description: '权限',
  })
  role: string;

  @ApiProperty({
    description: '状态',
  })
  status: string;

  @ApiProperty({
    description: '标签',
  })
  tag: string;

  @ApiProperty({
    description: '创建时间',
  })
  createTime: number;
}

export class UserUpdateAvatar {
  @ApiProperty({
    description: '用户ID',
  })
  userId: string;

  @ApiProperty({
    description: '密码',
  })
  password: string;

  @ApiProperty({
    description: '头像(文件对象)',
  })
  avatar: string;
}