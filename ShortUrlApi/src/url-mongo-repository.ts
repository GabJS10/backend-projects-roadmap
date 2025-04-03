import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Url, UrlDocument, UrlModel } from './schemas/url-schema';
import { ShortUrlDto } from './shorturl/dto/create-shorturl.dto';
import { UrlRepository } from './url-repository';
import { InjectModel } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';
@Injectable()
export class UrlMongoRepository implements UrlRepository {
  constructor(@InjectModel(Url.name) private UrlModel: UrlModel) {}

  async create(shortUrlDto: ShortUrlDto): Promise<Url> {
    if (!shortUrlDto.url) {
      throw new HttpException('Url is required', HttpStatus.BAD_REQUEST);
    }
    const shortCode = nanoid(6);

    try {
      const url = await new this.UrlModel({
        url: shortUrlDto.url,
        shortCode,
      }).save();
      return this.mapUrl(url);
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Url already exists', HttpStatus.CONFLICT);
      }

      throw new HttpException(
        'Error creating url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async retrieve(shortCode: string): Promise<Url> {
    if (!shortCode) {
      throw new HttpException('Short code is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const url = await this.UrlModel.findOne({ shortCode }).exec();

      if (!url) {
        throw new HttpException('Url not found', HttpStatus.NOT_FOUND);
      }

      url.accessCount += 1;
      await url.save();

      return this.mapUrl(url);
    } catch (error) {
      throw new HttpException(
        'Error retrieving url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(shortUrlDto: ShortUrlDto, shortCode: string): Promise<Url> {
    if (!shortUrlDto.url || !shortCode) {
      throw new HttpException(
        'Url and short code are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const url = await this.UrlModel.findOneAndUpdate(
        { shortCode },
        { url: shortUrlDto.url, updatedAt: Date.now() },
        { new: true },
      ).exec();

      if (!url) {
        throw new HttpException('Url not found', HttpStatus.NOT_FOUND);
      }

      return this.mapUrl(url);
    } catch (error) {
      throw new HttpException(
        'Error updating url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(shortCode: string): Promise<Url> {
    if (!shortCode) {
      throw new HttpException('Url is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const url = await this.UrlModel.findOneAndDelete({
        shortCode: shortCode,
      }).exec();

      if (!url) {
        throw new HttpException('Url not found', HttpStatus.NOT_FOUND);
      }

      return this.mapUrl(url);
    } catch (error) {
      throw new HttpException(
        'Error deleting url',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private mapUrl(UrlDocument: UrlDocument): Url {
    const url = new Url();

    url.url = UrlDocument.url;
    url.shortCode = UrlDocument.shortCode;
    url.createdAt = UrlDocument.createdAt;
    url.updatedAt = UrlDocument.updatedAt;
    url.accessCount = UrlDocument.accessCount;
    return url;
  }
}
