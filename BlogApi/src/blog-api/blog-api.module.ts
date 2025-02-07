import { Module } from '@nestjs/common';
import { BlogApiService } from './blog-api.service';
import { BlogApiController } from './blog-api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema,Blog } from './schemas/blog-schema';
import { BLOG_REPOSITORY } from './blog-repository';
import { BlogMongoRepository } from './blog-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Blog.name,
      schema: BlogSchema
    }])
  ],
  controllers: [BlogApiController],
  providers: [BlogApiService,{
    provide: BLOG_REPOSITORY,
    useClass: BlogMongoRepository
  }],
})
export class BlogApiModule {}
