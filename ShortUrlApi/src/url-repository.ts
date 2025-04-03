import { Url } from './schemas/url-schema';
import { ShortUrlDto } from './shorturl/dto/create-shorturl.dto';

export const URL_REPOSITORY = 'URL_REPOSITORY';

export interface UrlRepository {
  create(shortUrlDto: ShortUrlDto): Promise<Url>;
  retrieve(shortCode: string): Promise<Url>;
  update(shortUrlDto: ShortUrlDto, shortCode: string): Promise<Url>;
  delete(shortCode: string): Promise<Url>;
}
