import { HttpCode, HttpException, Injectable, Response } from "@nestjs/common";
import { BlogRepository } from "./blog-repository";
import { CreateBlogApiDto } from "./dto/create-blog-api.dto";
import { Blog, BlogDocument, BlogModel } from "./schemas/blog-schema";
import { InjectModel } from "@nestjs/mongoose";
import { response } from "express";
import { UpdateBlogApiDto } from "./dto/update-blog-api.dto";


@Injectable()
export class BlogMongoRepository implements BlogRepository{

    constructor(@InjectModel(Blog.name) private readonly blogModel: BlogModel){}
    async findBySeachTermn(searchTerm: string): Promise<Blog[]> {

        if (!searchTerm) {
            throw new HttpException('Search term is required', 400);
        }

        const blogs = await this.blogModel.aggregate([
            {
                $match: {
                    $or: [
                        { title: { $regex: searchTerm, $options: 'i' } },
                        { content: { $regex: searchTerm, $options: 'i' } },
                        { category: { $regex: searchTerm, $options: 'i' } },
                    ]
                }
            }
        ])

        if (!blogs) {
            
            throw new HttpException('Blogs not found', 404);
        }

        return blogs.map(blog => this.mapBlog(blog));
    }
    async findOne(title: string): Promise<Blog> {
            
            const blog = await this.blogModel.findOne({ title }).lean();
        
            if (!blog) {
                throw new HttpException('Blog not found', 404);
            }
            
            return this.mapBlog(blog);
                
    }
    async update(title: string, updateBlogApiDto: UpdateBlogApiDto): Promise<Blog> {
        const blogUpdated = await this.blogModel.findOneAndUpdate({ title }, updateBlogApiDto, { new: true }).lean();
        if (!blogUpdated) {
            throw new HttpException('Blog not found', 404);
        }

        return this.mapBlog(blogUpdated);
    }
    async delete(title:string): Promise<Blog> {
        const blogDeleted = await this.blogModel.findOneAndDelete({ title }).lean();
        if (!blogDeleted) {
            throw new HttpException('Blog not found', 404);
        }

        return this.mapBlog(blogDeleted);
    }

    async findAll(): Promise<Blog[]> {
        try {
            const blogs = await this.blogModel.find().lean();
            return blogs.map(blog => this.mapBlog(blog));
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }
    async create(createBlogApiDto: CreateBlogApiDto): Promise<Blog> {
        try {
            const blog = await new this.blogModel(createBlogApiDto).save();
             return this.mapBlog(blog);
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException('Blog already exists', 400);
            }
            
        }
    }


    private mapBlog(blogDocument: BlogDocument): Blog {
        const blog = new Blog();


        blog.title = blogDocument.title;
        blog.content = blogDocument.content;
        blog.category = blogDocument.category;
        blog.tags = blogDocument.tags;
        blog.createdAt = blogDocument.createdAt;
        blog.updatedAt = blogDocument.updatedAt;

        return blog

    }

}