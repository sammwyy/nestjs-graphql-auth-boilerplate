import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    /**
     * Using the GraphQL module it will load all the schemas automatically
     * and generate the .gql file
     * Also the playground mode and debug will only be available if the application
     *  is running under a development environment.
     */
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, 'graphql', 'schema.gql'),
      driver: ApolloDriver,
    }),

    /**
     * Using the database module it will connect to the
     * mongodb server specified in the environment variable "MONGODB_URI"
     */
    MongooseModule.forRoot(process.env['MONGODB_URI']),

    /**
     * Load all the remaining modules that are responsible for managing different schemes and services.
     */
    AuthModule,
    SessionsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
