import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SavegamesModule } from './savegames/savegames.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractBearerTokenMiddleware } from './machineId.middleware';
import { CurrentPricesModule } from './current-prices/current-prices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: false,
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        port: configService.get<number>('DATABASE_PORT', 5432),
      }),
    }),
    SavegamesModule,
    CurrentPricesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ExtractBearerTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
