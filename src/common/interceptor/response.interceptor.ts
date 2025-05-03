/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-12-01 13:42:52
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-07 10:08:58
 */
import { NestInterceptor, ExecutionContext, CallHandler, Injectable, } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { RCode } from '../constant/rcode';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>,): import('rxjs').Observable<any> | Promise<import('rxjs').Observable<any>> {
    return next.handle().pipe(
      map(content => {
        return {
          data: content.data || undefined,
          code: content.code || RCode.OK,
          msg: content.msg || null,
        };
      }),
    );
  }
}