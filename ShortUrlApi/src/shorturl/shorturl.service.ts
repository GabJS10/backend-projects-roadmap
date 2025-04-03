import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ShortUrlDto } from './dto/create-shorturl.dto';
import { URL_REPOSITORY, UrlRepository } from 'src/url-repository';

@Injectable()
export class ShorturlService {
  constructor(@Inject(URL_REPOSITORY) private urlRepository: UrlRepository) {}

  create(createShorturlDto: ShortUrlDto) {
    if (!createShorturlDto.url) {
      throw new HttpException('Url is required', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.urlRepository.create(createShorturlDto);
    } catch (error) {
      throw error;
    }
  }

  findOne(shortcode: string) {
    if (!shortcode) {
      throw new HttpException('Short code is required', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.urlRepository.retrieve(shortcode);
    } catch (error) {
      throw error;
    }
  }

  update(shortcode: string, updateShorturlDto: ShortUrlDto) {
    if (!shortcode || !updateShorturlDto.url) {
      throw new HttpException(
        'Short code and url are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return this.urlRepository.update(updateShorturlDto, shortcode);
    } catch (error) {
      throw error;
    }
  }

  remove(shortcode: string) {
    if (!shortcode) {
      throw new HttpException('Short code is required', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.urlRepository.delete(shortcode);
    } catch (error) {
      throw error;
    }
  }
}
