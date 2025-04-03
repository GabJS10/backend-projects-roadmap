import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CartDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  productId: string;
}
