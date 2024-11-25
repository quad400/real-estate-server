import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from "joi"

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configservice: ConfigService) => ({
        uri: configservice.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    })
  ],
  providers: [ConfigService]
})
export class DatabaseModule {}
