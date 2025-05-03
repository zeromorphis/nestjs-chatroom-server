/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-07 10:13:02
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-08 10:28:49
 */
// 默认群基础信息配置
export const DEFAULT_GROUP = {
    groupId: 'default_group',//此字段请勿更改
    groupName: '默认聊天室',//可随意更改
    userId: 'admin',//此字段请勿更改
    notice: '群主很懒，没写公告',//可随意更改
};

// 鉴权配置KEY
export const jwtConstants = {
    secret: 'genal-chat',
};
