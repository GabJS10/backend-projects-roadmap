import { HttpException, Inject, Injectable } from '@nestjs/common';
import { returnUrl } from './utils';
import { Weather } from './dto/create-weather.dto';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
@Injectable()
export class WeatherService {
  
constructor(private configService: ConfigService,@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getWeather(city: string) {

    const key = this.configService.get('WEATHER_API');


    const cachedWeather = await this.cacheManager.get(city);

    if (cachedWeather) {
      return cachedWeather
    }

    try {
      const response = await fetch(returnUrl(city, key));
      const data:Weather = await response.json();

      const weatherObject = {
        resolvedAddress: data.resolvedAddress,
        timezone: data.timezone,
        description: data.description,
        currentConditions: {
          temp: data.currentConditions.temp,
          feelslike: data.currentConditions.feelslike,
          humidity: data.currentConditions.humidity
        }
      }

      await this.cacheManager.set(city, weatherObject,  2000 * 10);

      return weatherObject
    } catch (error) {

      throw new HttpException('City not found', 400) 
    }
  }
}
