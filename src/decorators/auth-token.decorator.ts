import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

const AuthToken = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.headers['authorization']?.split(' ')[1];
    }
  },
);

export default AuthToken;
