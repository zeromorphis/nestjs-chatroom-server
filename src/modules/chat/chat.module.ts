/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-01 13:42:52
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-08 10:41:05
 */
import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { User } from '../user/entity/user.entity';
import { Group, GroupMap } from '../group/entity/group.entity';
import { GroupMessage } from '../group/entity/groupMessage.entity';
import { UserMap } from '../friend/entity/friend.entity';
import { FriendMessage } from '../friend/entity/friendMessage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_GROUP } from 'src/common/constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group, GroupMap, GroupMessage, UserMap, FriendMessage])
  ],
  providers: [ChatGateway],
})
export class ChatModule {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) { }
  async onModuleInit() {
    const defaultGroup = await this.groupRepository.find({ groupId: DEFAULT_GROUP.groupId });
    if (!defaultGroup.length) {
      await this.groupRepository.save({
        groupId: DEFAULT_GROUP.groupId,
        userId: DEFAULT_GROUP.userId,
        groupName: DEFAULT_GROUP.groupName,
        notice: DEFAULT_GROUP.notice,
        createTime: new Date().valueOf()
      });
      Logger.log(`${DEFAULT_GROUP.groupName}`, 'Create defaultGroup');
    }
  }
}
