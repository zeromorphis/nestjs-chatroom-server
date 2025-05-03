/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-05 19:09:39
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-06 16:58:01
 */
/**
 * 群名/用户名校验
 * @param name
 */
export function nameVerify(name: string): boolean {
  const nameReg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (name.length === 0) {
    return false;
  }
  if (!nameReg.test(name)) {
    return false;
  }
  if (name.length > 9) {
    return false;
  }
  return true;
}

/**
 * 密码校验
 * @param password
 */
export function passwordVerify(password: string): boolean {
  console.log(password);
  const passwordReg = /^\w+$/gis;
  if (password.length === 0) {
    return false;
  }
  if (!passwordReg.test(password)) {
    return false;
  }
  if (password.length > 35) {
    return false;
  }
  return true;
}

/**
 * 群名/用户名比对
 * @param username
 */
export function checkUsername(username: string, sqlUsername: string): boolean {
  return username === sqlUsername;
}

/**
 * 密码比对
 * @param password
 */
export function checkPassword(password: string, sqlPassword: string): boolean {
  return password === sqlPassword;
}