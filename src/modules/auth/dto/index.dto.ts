/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-02 11:36:33
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-02 13:41:40
 */
import { ApiProperty } from '@nestjs/swagger';

export class AuthLogin {
  @ApiProperty({
    description: '用户名',
    default: 'YT',
  })
  username: string;

  @ApiProperty({
    description: '密码',
    default: '123',
  })
  password: string;
}