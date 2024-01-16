import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ENUM } from 'src/common/enum';
import { HttpResponse } from 'src/common/httpResponse';
import { RESPONSE_DATA } from 'src/common/responses';
import { NotificationEntity } from 'src/entity/notification.entity';
import { RabbitMQProducer } from 'src/providers/rabbit/rabbit.producer';
import { CreateNotificationDto } from 'src/modules/notification/dto/notification.dto';

import { CONSTANT } from 'src/common/constant';

@ApiTags('Bulk Notification')
@Controller('/')
export class NotificationController {
  constructor(
    private readonly notificationEntity: NotificationEntity,
    private readonly httpResponse: HttpResponse,
    private readonly rabbitMQProducer: RabbitMQProducer
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'API to send bulk notifications' })
  async notification(@Body() createNotificationDto: CreateNotificationDto, @Res() res: Response) {
    const notificationData = await this.notificationEntity.saveData(createNotificationDto);
    const publish = {
      createNotificationDto,
      senderDetails: {
        adminName: CONSTANT.APP_NAME,
      },
    };

    switch (createNotificationDto.notificationType) {
      case ENUM.NOTIFICATION_TYPE.PUSH: {
        await this.rabbitMQProducer.sendPush(publish);
        break;
      }
    }
    return this.httpResponse.sendResponse(res, RESPONSE_DATA.NOTIFICATION_SENT, notificationData);
  }
}
