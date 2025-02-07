import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configLoader } from './config-loader';
import { envSchema } from './env-schema';
import { BlogApiModule } from './blog-api/blog-api.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [ConfigModule.forRoot({
    load: [configLoader],
    validationSchema: envSchema
  }), 
  BlogApiModule,
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const config = configService.get('mongo');
      
      return {
        uri: config.uri
      }
    }
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
