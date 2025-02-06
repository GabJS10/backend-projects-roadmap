import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { WeatherModule } from './weather/weather.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
@Module({
  imports: [
    ConfigModule.forRoot(), 
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          store: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
    }),
    WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
