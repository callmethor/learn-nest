import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { logger } from './middleware/logger.middleware';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [CatsModule, AdminModule, AuthModule, NoteModule, UsersModule],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);
  }
}
