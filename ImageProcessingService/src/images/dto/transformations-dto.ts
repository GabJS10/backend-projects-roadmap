import { IsOptional, IsNumber, IsBoolean, IsIn } from 'class-validator';

type formats = 'jpeg' | 'png' | 'jpg' | 'webp' | 'avif' | 'tiff';

export class TransformImageDto {
  @IsOptional()
  resize?: {
    width: number;
    height: number;
  };

  @IsOptional()
  crop?: {
    width: number;
    height: number;
    left: number;
    top: number;
  };

  @IsOptional()
  @IsNumber()
  rotate?: number;

  @IsOptional()
  @IsBoolean()
  flip?: boolean;

  @IsOptional()
  @IsIn(['jpeg', 'png', 'webp', 'avif', 'tiff', 'jpg'])
  format?: formats;

  @IsOptional()
  @IsBoolean()
  grayscale?: boolean;

  @IsOptional()
  @IsBoolean()
  sepia?: boolean;

  @IsOptional()
  compress?: {
    quality: number;
  };

  @IsOptional()
  watermark?: {
    imagePath: string;
    gravity?:
      | 'northwest'
      | 'north'
      | 'northeast'
      | 'west'
      | 'center'
      | 'east'
      | 'southwest'
      | 'south'
      | 'southeast';
    opacity?: number;
  };
}
