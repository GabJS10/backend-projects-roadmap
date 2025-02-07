import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogApiDto } from './create-blog-api.dto';

export class UpdateBlogApiDto extends PartialType(CreateBlogApiDto) {}
