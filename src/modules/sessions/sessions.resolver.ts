import { Request } from '@nestjs/common';
import { Request as IRequest } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import CreateSessionDTO from './dto/create-session.dto';
import { Session } from './schema/session';
import { SessionsService } from './sessions.service';

@Resolver(() => Resolver)
export class SessionsResolver {
  constructor(
    private sessionsService: SessionsService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Session)
  public async createSession(
    @Request() req: IRequest,
    @Args('payload') payload: CreateSessionDTO,
  ): Promise<Session> {
    const user = await this.usersService.getByEmail(payload.email);
    if (!user) {
      throw UsersService.USER_NOT_FOUND;
    }

    const validPassword = await user.comparePassword(payload.password);
    if (validPassword === true) {
      return await this.sessionsService.createSession(
        user._id,
        req.ip,
        req.headers['user-agent'],
      );
    } else {
      throw SessionsService.WRONG_CREDENTIALS;
    }
  }
}
