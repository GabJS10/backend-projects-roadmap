import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env-schema';
import { TodosModule } from './todos/todos.module';
import configLoader from './config-loader';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: envSchema,
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
