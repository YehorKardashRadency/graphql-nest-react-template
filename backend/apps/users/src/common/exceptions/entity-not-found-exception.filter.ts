import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements GqlExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    return new NotFoundException(exception.message);
  }
}
