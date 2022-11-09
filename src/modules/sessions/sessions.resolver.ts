import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import CreateSessionDTO from './dto/create-session.dto';

import CurrentUser from 'src/decorators/current-user.decorator';
import GqlRequest from 'src/decorators/gql-request.decorator';

import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

import { Session } from './schema/session';
import { SessionsService } from './sessions.service';
import { SessionWithToken } from './schema/session-with-token';

import { UsersService } from '../users/users.service';
import { User } from '../users/models/user';
import AuthToken from 'src/decorators/auth-token.decorator';

@Resolver(() => Resolver)
export class SessionsResolver {
  constructor(
    private sessionsService: SessionsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Session])
  public getSessions(@CurrentUser() user: User): Promise<Session[]> {
    return this.sessionsService.getByUser(user._id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  public async invalidateSession(@AuthToken() token: string): Promise<boolean> {
    return this.sessionsService.deleteByToken(token);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  public async invalidateAllSessions(
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.sessionsService.deleteByUser(user._id);
  }

  @Mutation(() => SessionWithToken)
  public async createSession(
    @GqlRequest() req: Request,
    @Args('payload') payload: CreateSessionDTO,
  ): Promise<SessionWithToken> {
    const user = await this.usersService.getByEmail(payload.email);
    if (!user) {
      throw UsersService.USER_NOT_FOUND;
    }
    const validPassword = await user.comparePassword(payload.password);
    if (validPassword === true) {
      return await this.sessionsService.createSession(
        user._id,
        req.socket.remoteAddress,
        req.headers['user-agent'],
      );
    } else {
      throw SessionsService.WRONG_CREDENTIALS;
    }
  }
}
