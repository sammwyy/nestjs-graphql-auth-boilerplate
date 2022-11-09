import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Session, SessionSchema } from './schema/session';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Session.name,
        schema: SessionSchema,
      },
    ]),
    UsersModule,
    JwtModule,
  ],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
