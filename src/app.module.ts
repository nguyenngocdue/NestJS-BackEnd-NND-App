import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://nodejs_app1:E9SBMy644OCJ0xj2@nestjsapp1.doz5w.mongodb.net/'),    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>({
        uri: configService.get<string>('MONGO_URL')
      }),
      inject: [ConfigService]
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
