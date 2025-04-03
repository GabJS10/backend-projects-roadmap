import { Module } from '@nestjs/common';
import { ShorturlService } from './shorturl.service';
import { ShorturlController } from './shorturl.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/schemas/url-schema';
import { URL_REPOSITORY } from 'src/url-repository';
import { UrlMongoRepository } from 'src/url-mongo-repository';

@Module({
  imports: [MongooseModule.forFeature(
    [{
      name: Url.name,
      schema: UrlSchema
    }]
  )],
  controllers: [ShorturlController],
  providers: [ShorturlService, {
    provide: URL_REPOSITORY,
    useClass: UrlMongoRepository
  }],

})
export class ShorturlModule {}
