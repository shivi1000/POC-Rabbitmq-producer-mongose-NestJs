import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityModule } from 'src/entity/entity.module';
import { RabbitMQ } from './rabbit.service';
import { RabbitMQProducer } from './rabbit.producer';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  providers: [RabbitMQ, RabbitMQProducer, ConfigService],
  exports: [RabbitMQProducer],
})
export class RabbitModule implements OnModuleInit {
  constructor(private readonly rabbitMQ: RabbitMQ) {}

  async onModuleInit() {
    await this.rabbitMQ.createConnection();
  }
}
