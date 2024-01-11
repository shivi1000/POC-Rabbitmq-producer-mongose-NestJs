import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database/db.module';
import { schemaProviders } from 'src/schema/schema.provider';
import { UserEntity } from './user.entity';
import { UserNotificationEntity } from './user-notification.entity';
import { UserSessionEntity } from './userSession.entity';
@Module({
  imports: [DatabaseModule],
  providers: [...schemaProviders, UserEntity, UserNotificationEntity, UserSessionEntity],
  exports: [UserEntity, UserNotificationEntity, UserSessionEntity],
})
export class EntityModule {}
