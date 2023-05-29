import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagementModule } from './common/auth0';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('USERS_DB_NAME'),
          entities: [UserEntity]
        };
      }
    }),
    TypeOrmModule.forFeature([UserEntity]),
    ManagementModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          domain: configService.getOrThrow('AUTH0_DOMAIN'),
          clientId: configService.getOrThrow('AUTH0_CLIENT_ID'),
          clientSecret: configService.getOrThrow('AUTH0_CLIENT_SECRET'),
          audience: configService.getOrThrow('AUTH0_MANAGEMENT_AUDIENCE'),
          scope: 'read:users update:users',
          tokenProvider: { enableCache: false }
        };
      }
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    })
  ],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
