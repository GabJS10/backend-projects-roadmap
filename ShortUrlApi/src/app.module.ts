import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShorturlModule } from './shorturl/shorturl.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configLoader from './config-loader';
import { envSchema } from './env-schema';
import { MongooseModule } from '@nestjs/mongoose';
MongooseModule
@Module({
  imports: [ShorturlModule, 
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory:  (configService: ConfigService) => {
        const uri = configService.get('database.MONGO_URI');
        return {
        uri
      }
    }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
