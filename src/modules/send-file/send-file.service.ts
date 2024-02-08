import { Injectable } from '@nestjs/common';
import { ENUM } from 'src/common/enum';
import { RESPONSE_DATA } from 'src/common/responses';
import { RabbitMQProducer } from 'src/providers/rabbit/rabbit.producer';

@Injectable()
export class FileUploadService {
  constructor(private readonly rabbitMQProducer: RabbitMQProducer) {}

  async uploadFile(file: any, userEmail: string[]) {
    console.log('inside upload----------->');
    const publish = {
      type: ENUM.NOTIFICATION_TYPE.EMAIL,
      file: file,
      user: userEmail,
    };
    await this.rabbitMQProducer.sendEmail(publish);
    console.log('email publish successfully');
    return [RESPONSE_DATA.SUCCESS, {}];
  }
}
