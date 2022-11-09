import { Request } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import CreateSessionDTO from './dto/create-session.dto';
import { Session } from './schema/session';
import { SessionsService } from './sessions.service';
import { SessionWithToken } from './schema/session-with-token';
import GqlRequest from 'src/decorators/gql-request.decorator';

@Resolver(() => Resolver)
export class SessionsResolver {
  constructor(
    private sessionsService: SessionsService,
    private usersService: UsersService,
  ) {}

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
