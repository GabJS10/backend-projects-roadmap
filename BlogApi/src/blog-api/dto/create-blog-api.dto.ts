import { IsArray, IsNotEmpty, IsString} from 'class-validator';

export class CreateBlogApiDto {

    @IsNotEmpty()
    @IsString()
    title: string;


    @IsString()
    @IsNotEmpty()
    content: string;


    @IsString()
    @IsNotEmpty()
    category: string;


    @IsString({
        each: true
    })
    @IsNotEmpty({
        each: true
    })
    @IsArray()
    tags: string[];

}
