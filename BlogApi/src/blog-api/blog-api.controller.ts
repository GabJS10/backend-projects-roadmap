import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BlogApiService } from './blog-api.service';
import { CreateBlogApiDto } from './dto/create-blog-api.dto';
import { UpdateBlogApiDto } from './dto/update-blog-api.dto';

@Controller('blog-api')
export class BlogApiController {
  constructor(private readonly blogApiService: BlogApiService) {}

  @Post()
  create(@Body() createBlogApiDto: CreateBlogApiDto) {
    return this.blogApiService.create(createBlogApiDto);
  }

  @Get('search')
  findBySeachTerm(@Query('term') term: string) {
    console.log(term,"kaskdasdas");
    
    return this.blogApiService.findBySeachTermn(term);
  }

  @Get()
  findAll() {
    return this.blogApiService.findAll();
  }

  @Get(':title')
  findOne(@Param('title') title: string) {
    
    return this.blogApiService.findOne(title);
  }


 
  @Patch(':title')
  update(@Param('title') title: string, @Body() updateBlogApiDto: UpdateBlogApiDto) {
    return this.blogApiService.update(title, updateBlogApiDto);
  }

  @Delete(':title')
  remove(@Param('title') title: string) {
    return this.blogApiService.remove(title);
  }
}
