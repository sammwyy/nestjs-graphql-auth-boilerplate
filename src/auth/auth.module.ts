import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionsModule } from 'src/modules/sessions/sessions.module';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtStrategy } from './strategies/jwt.stategy';

@Module({
  imports: [
    UsersModule,
    SessionsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
