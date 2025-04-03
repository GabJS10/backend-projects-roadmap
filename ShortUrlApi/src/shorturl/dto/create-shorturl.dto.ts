import { IsNotEmpty, IsUrl } from 'class-validator';

export class ShortUrlDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
