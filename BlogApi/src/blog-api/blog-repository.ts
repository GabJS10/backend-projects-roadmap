import { Blog } from "./schemas/blog-schema";
import { CreateBlogApiDto } from "./dto/create-blog-api.dto";
import { UpdateBlogApiDto } from "./dto/update-blog-api.dto";

export const BLOG_REPOSITORY = 'BlogRepository';
export interface BlogRepository {
    findAll(): Promise<Blog[]>;
    findOne(title: string): Promise<Blog>;
    update(title:string, updateBlogApiDto: UpdateBlogApiDto): Promise<Blog>;
    delete(title: string): Promise<Blog>;
    create(createBlogApiDto: CreateBlogApiDto): Promise<Blog>;
    findBySeachTermn(searchTerm: string): Promise<Blog[]>
}