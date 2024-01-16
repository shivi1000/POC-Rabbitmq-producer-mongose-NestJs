import { Module } from '@nestjs/common';
import { EntityModule } from 'src/entity/entity.module';
import { HttpResponse } from 'src/common/httpResponse';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from './notification.controller';
import { RabbitMQProducer } from 'src/providers/rabbit/rabbit.producer';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  controllers: [NotificationController],
  providers: [HttpResponse, RabbitMQProducer],
})
export class NotificationModule {}
