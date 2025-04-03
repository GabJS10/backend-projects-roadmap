import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShorturlService } from './shorturl.service';
import { ShortUrlDto } from './dto/create-shorturl.dto';

@Controller('shorturl')
export class ShorturlController {
  constructor(private readonly shorturlService: ShorturlService) {}

  @Post()
  create(@Body() createShorturlDto: ShortUrlDto) {
    try {
      return this.shorturlService.create(createShorturlDto);
    } catch (error) {
      throw error;
    }
  }

  @Get(':shortcode')
  findOne(@Param('shortcode') shortcode: string) {
    try {
      return this.shorturlService.findOne(shortcode);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':shortcode')
  update(
    @Param('shortcode') shortcode: string,
    @Body() updateShorturlDto: ShortUrlDto,
  ) {
    try {
      return this.shorturlService.update(shortcode, updateShorturlDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':shortcode')
  remove(@Param('shortcode') shortcode: string) {
    try {
      return this.shorturlService.remove(shortcode);
    } catch (error) {
      throw error;
    }
  }
}
