import { ConflictException, Injectable } from '@nestjs/common';
import { CONSTANT } from 'src/common/constant';
import { ENUM } from 'src/common/enum';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { UserEntity } from 'src/entity/user.entity';
import { GuardService } from 'src/guards/guards.service';
import { RabbitMQProducer } from 'src/providers/rabbit/rabbit.producer';
import { CreateOnboardingDto, DeviceParamsDto } from './dto/on-boarding.dto';
import { CreateUserSession } from './interface/on-boarding.interface';
import { UserSessionEntity } from 'src/entity/userSession.entity';

@Injectable()
export class UserOnBoardingService {
  constructor(
    private readonly userEntity: UserEntity,
    private readonly userSessionEntity: UserSessionEntity,
    private readonly guardService: GuardService,
    private readonly rabbitMQProducer: RabbitMQProducer
  ) {}

  async signUp(createOnboardingDto: CreateOnboardingDto, deviceParamsDto: DeviceParamsDto) {
    const userData = await this.userEntity.findOne(createOnboardingDto);
    if (userData) throw new ConflictException(RESPONSE_DATA.MOBILE_NO_ALREADY_EXIST);
    createOnboardingDto.password = this.guardService.hashData(createOnboardingDto.password, CONSTANT.PASSWORD_HASH_SALT);
    const createUser = Object.assign(createOnboardingDto);
    const data = await this.userEntity.create(createUser);
    const addSessionData: CreateUserSession = {
      userId: userData?._id,
      ipAddress: deviceParamsDto?.ip,
      deviceToken: deviceParamsDto?.devicetoken,
    };
    const publish = {
      type: ENUM.NOTIFICATION_TYPE.PUSH,
      pushData: {
        deviceToken: deviceParamsDto?.devicetoken,
        title: 'SIGN_UP_SUCCESSFULLY',
        receiverDetails: {
          _id: userData._id,
          name: userData.name,
        },
        senderDetails: {
          _id: userData._id,
          name: CONSTANT.APP_NAME,
        },
      },
    };
    await this.rabbitMQProducer.sendPush(publish);
    const sessionData = await this.userSessionEntity.createUserSession(addSessionData);
    const token = await this.guardService.jwtTokenGeneration({
      type: 'USER_LOGIN',
      sessionId: sessionData.id,
      userId: userData._id,
    });
    return [RESPONSE_MSG.SUCCESS, { id: data._id, token: token }];
  }
}
