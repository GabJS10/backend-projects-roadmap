import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(":city")
  getWeather(@Param('city') city: string) {
    return this.weatherService.getWeather(city.toLowerCase());
  }
}
