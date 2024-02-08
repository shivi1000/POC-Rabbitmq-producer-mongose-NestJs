import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpResponse } from 'src/common/httpResponse';
// import { EntityModule } from 'src/entity/entity.module';
import { RabbitMQProducer } from 'src/providers/rabbit/rabbit.producer';
import { FileUploadController } from 'src/modules/send-file/send-file.controller';
import { FileUploadService } from './send-file.service';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [FileUploadController],
  providers: [FileUploadService, HttpResponse, RabbitMQProducer],
})
export class fileUploadModule {}
