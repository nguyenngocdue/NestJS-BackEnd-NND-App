import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { CompaniesModule } from './companies/companies.module';


@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://nodejs_app1:E9SBMy644OCJ0xj2@nestjsapp1.doz5w.mongodb.net/'),    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>({
        uri: configService.get<string>('MONGO_URL'),
        // add soft delete for schema
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      }),
      inject: [ConfigService]
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,

    AuthModule,

    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
