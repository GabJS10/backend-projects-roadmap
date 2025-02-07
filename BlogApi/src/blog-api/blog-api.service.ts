import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogApiDto } from './dto/create-blog-api.dto';
import { UpdateBlogApiDto } from './dto/update-blog-api.dto';
import { BLOG_REPOSITORY, BlogRepository } from './blog-repository';

@Injectable()
export class BlogApiService {

  constructor(@Inject(BLOG_REPOSITORY) private readonly blogRepository: BlogRepository) {}

  create(createBlogApiDto: CreateBlogApiDto) {
    return this.blogRepository.create(createBlogApiDto);
  }

  findBySeachTermn(term: string) {
    return this.blogRepository.findBySeachTermn(term);
  }


   findAll() {
    return this.blogRepository.findAll(); 
  }

  findOne(title: string) {
    return this.blogRepository.findOne(title);
  }

  update(title: string, updateBlogApiDto: UpdateBlogApiDto) {
    return this.blogRepository.update(title, updateBlogApiDto);
  }

  remove(title: string) {
    return this.blogRepository.delete(title);
  }
}
