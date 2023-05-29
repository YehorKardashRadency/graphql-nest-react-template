import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { EntityNotFoundFilter } from './common/exceptions/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalFilters(new EntityNotFoundFilter());
  await app.listen(3001);
}
bootstrap();
