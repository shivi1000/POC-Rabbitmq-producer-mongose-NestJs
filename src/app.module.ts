import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from 'config/configuration';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './providers/database/db.module';
import { schemaProviders } from './schema/schema.provider';
import { RabbitModule } from './providers/rabbit/rabbit.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/exceptionFilter';
import { fileUploadModule } from './modules/send-file/send-file.module';
import { NotificationModule } from './modules/notification/notification/notification.module';

const routes: Routes = [
  {
    path: '/bulk-notification',
    module: NotificationModule,
  },
  {
    path: '/file',
    module: fileUploadModule,
  },
];
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ScheduleModule.forRoot(),
    RabbitModule,
    DatabaseModule,
    LoggerModule,
    RouterModule.register(routes),
    NotificationModule,
    fileUploadModule,
  ],
  providers: [
    ...schemaProviders,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
