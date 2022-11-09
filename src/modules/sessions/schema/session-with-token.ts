import { Field, ObjectType } from '@nestjs/graphql';
import { Session } from './session';

@ObjectType()
export class SessionWithToken extends Session {
  @Field()
  token: string;
}
