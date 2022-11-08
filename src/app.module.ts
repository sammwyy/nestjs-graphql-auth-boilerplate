import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, 'graphql', 'schema.gql'),
      driver: ApolloDriver,
    }),
    MongooseModule.forRoot(process.env['MONGODB_URI']),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env['MARIADB_HOST'],
      port: parseInt(process.env['MARIADB_PORT']),
      username: process.env['MARIADB_USER'],
      password: process.env['MARIADB_PASS'],
      database: process.env['MARIADB_DATABASE'],
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
