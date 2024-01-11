import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENUM } from 'src/common/enum';
import { channels } from './rabbit.service';
const logger = new Logger('HTTP');

@Injectable()
export class RabbitMQProducer {
  QUEUE: any = '';
  constructor(private readonly configService: ConfigService) {
    this.QUEUE = this.configService.get<string>('RABBIT_MQ_QUEUE');
  }
  async sendPush(payload: any) {
    try {
      payload['channel'] = ENUM.CHANNEL_TYPE.PUSH;
      const channel = channels[ENUM.CHANNEL_TYPE.PUSH];
      channel.publish(this.QUEUE, ENUM.CHANNEL_TYPE.PUSH, Buffer.from(JSON.stringify(payload)));
      return;
    } catch (error) {
      logger.error(`we have an error sendPush' ${error}`, {
        url: 'Rabbit MQ Error in Rabbit MQ',
        httpStatus: 500,
      });
      console.error(`we have an error sendPush ==> ${error}`);
      return {};
    }
  }
}
