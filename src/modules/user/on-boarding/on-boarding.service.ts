import { Injectable } from '@nestjs/common';
import { CONSTANT } from 'src/common/constant';
import { ENUM } from 'src/common/enum';
import { RESPONSE_DATA } from 'src/common/responses';
import { UserEntity } from 'src/entity/user.entity';
import { GuardService } from 'src/guards/guards.service';
import { RabbitMQProducer } from 'src/providers/rabbit/rabbit.producer';
import { CreateOnboardingDto, DeviceParamsDto } from './dto/on-boarding.dto';
@Injectable()
export class UserOnBoardingService {
  constructor(private readonly userEntity: UserEntity, private readonly guardService: GuardService, private readonly rabbitMQProducer: RabbitMQProducer) {}

  async signUp(createOnboardingDto: CreateOnboardingDto, deviceParamsDto: DeviceParamsDto) {
    createOnboardingDto.password = this.guardService.hashData(createOnboardingDto.password, CONSTANT.PASSWORD_HASH_SALT);
    const createUser = Object.assign(createOnboardingDto);
    const data = await this.userEntity.create(createUser);

    const publish = {
      type: ENUM.NOTIFICATION_TYPE.PUSH,
      pushData: {
        deviceToken: deviceParamsDto?.devicetoken,
        title: 'SIGN_UP_SUCCESSFULLY',
        receiverDetails: {
          name: data?.name,
        },
        senderDetails: {
          name: CONSTANT.APP_NAME,
        },
      },
    };
    await this.rabbitMQProducer.sendPush(publish);
    const token = await this.guardService.jwtTokenGeneration({
      type: 'USER_LOGIN',
      userId: data._id,
    });
    return [RESPONSE_DATA.SUCCESS, { id: data?._id || null, token: token }];
  }
}
