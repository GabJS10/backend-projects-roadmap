import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env-schema';
import configLoader from './config-loader';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
    load: [configLoader],
    validationSchema: envSchema
  }),
    ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
