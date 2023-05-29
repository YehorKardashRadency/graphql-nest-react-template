import { createParamDecorator } from '@nestjs/common';
import { GraphQLExecutionContext } from '@nestjs/graphql';
import { CurrentUser } from './current-user.model';

export const GetUser = createParamDecorator(
  (_data: any, ctx: GraphQLExecutionContext): CurrentUser => {
    try {
      const headers = ctx.getArgs()[2].req.headers;
      if (headers.user) {
        return JSON.parse(headers.user);
      }
    } catch (err) {
      return null;
    }
  }
);
