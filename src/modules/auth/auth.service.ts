import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { GroupMap } from '../group/entity/group.entity';
import { nameVerify, passwordVerify, checkUsername, checkPassword } from 'src/common/tool/utils';
import { DEFAULT_GROUP } from 'src/common/constant';
import { RCode } from 'src/common/constant/rcode';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(GroupMap)
    private readonly groupUserRepository: Repository<GroupMap>,
    private readonly jwtService: JwtService,
  ) { }

  async login1(data: User): Promise<any> {
    const user = await this.userRepository.findOne({ username: data.username, password: data.password });
    if (!user) {
      return { code: 1, msg: '密码错误', data: '' };
    }
    if (!passwordVerify(data.password) || !nameVerify(data.username)) {
      return { code: RCode.FAIL, msg: '注册校验不通过！', data: '' };
    }
    user.password = data.password;
    const payload = { userId: user.userId, password: data.password };
    return {
      msg: '登录成功',
      data: {
        user: user,
        token: this.jwtService.sign(payload)
      },
    };
  }

  async login(loginDto: User): Promise<any> {
    try {
      const { username, password } = loginDto;
      const user = await this.userRepository.findOne({ where: { username } });
      if (user) {
        if (checkPassword(password, user.password)) {
          return Object.assign({ code: RCode.OK, msg: '登录成功', data: { ...user, token: this.jwtService.sign({ userId: user.userId, password }) } });
        } else {
          return Object.assign({ code: RCode.FAIL, msg: '密码错误' });
        }
      } else {
        return Object.assign({ code: RCode.FAIL, msg: '用户不存在' });
      }
    } catch (e) {
      return Object.assign({ code: RCode.ERROR, msg: '服务异常' });
    }
  }

  async register1(user: User): Promise<any> {
    const isHave = await this.userRepository.find({ username: user.username });
    if (isHave.length) {
      return { code: RCode.FAIL, msg: '用户名重复', data: '' };
    }
    if (!passwordVerify(user.password) || !nameVerify(user.username)) {
      return { code: RCode.FAIL, msg: '注册校验不通过！', data: '' };
    }
    user.avatar = `api/avatar/avatar(${Math.round(Math.random() * 19 + 1)}).png`;
    user.role = 'user';
    const newUser = await this.userRepository.save(user);
    const payload = { userId: newUser.userId, password: newUser.password };
    await this.groupUserRepository.save({
      userId: newUser.userId,
      groupId: DEFAULT_GROUP.groupId,
    });
    return {
      msg: '注册成功',
      data: {
        user: newUser,
        token: this.jwtService.sign(payload)
      },
    };
  }

  async register(registerDto: User): Promise<any> {
    try {
      const { username, password } = registerDto;
      const hasUser = await this.userRepository.findOne({ where: { username } });
      if (hasUser) {
        return Object.assign({ code: RCode.FAIL, msg: '用户已存在' });
      } else {
        registerDto.username = username;
        registerDto.password = password;
        registerDto.avatar = `api/avatar/avatar(${Math.round(Math.random() * 8 + 1)}).jpg`;
        registerDto.role = 'user';
        const newUser = await this.userRepository.save(registerDto);
        await this.groupUserRepository.save({ userId: newUser.userId, groupId: DEFAULT_GROUP.groupId });
        return Object.assign({ code: RCode.OK, msg: '登录成功', data: { ...newUser, token: this.jwtService.sign({ userId: newUser.userId, password }) } });
      }
    } catch (e) {
      return Object.assign({ code: RCode.ERROR, msg: '服务异常' });
    }
  }
}
