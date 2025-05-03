/*
 * @Descripttion: 任何你写的代码，超过6个月不去看它，当你再看时，都像是别人写的
 * @version: 5.0.0
 * @Author: 言棠
 * @Date: 2022-11-22 11:02:28
 * @LastEditors: 言棠
 * @LastEditTime: 2022-12-06 17:37:34
 */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { logger } from './common/middleware/logger.middleware';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 全局中间件
  app.use(logger);

  // 接口请求前缀
  // app.setGlobalPrefix('api');

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 配置全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 配置静态资源
  app.useStaticAssets(join(__dirname, '../public', '/'), {
    prefix: '/',
    setHeaders: res => {
      res.set('Cache-Control', 'max-age=2592000')
    }
  });

  // swagger 接口文档
  const documentBuilder = new DocumentBuilder().setTitle('Websocket ChatRoom接口文档').setDescription('code：状态码，msg：提示信息，data：返回值').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, documentBuilder, { ignoreGlobalPrefix: true });
  SwaggerModule.setup('swagger', app, document);

  // 启用Cors
  app.enableCors();

  // 端口监听
  await app.listen(12345);

  // 打印输出信息
  Logger.log(`http://localhost:12345`, `Server is running on`);
  Logger.log(`http://localhost:12345/swagger`, 'ChatRoom接口文档');
}
bootstrap();
