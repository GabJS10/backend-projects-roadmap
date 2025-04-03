import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  imageFront?: string;

  @IsOptional()
  @IsString()
  imageBack?: string;
}
