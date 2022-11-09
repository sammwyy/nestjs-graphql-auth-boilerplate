import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
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
    ,
    JwtModule,
  ],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
