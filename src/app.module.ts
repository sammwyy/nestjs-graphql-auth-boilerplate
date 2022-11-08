import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
