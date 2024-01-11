import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/schema/users.schema';
import { Dao } from 'src/providers/database/dao.provider';
import { CreateOnboardingDto } from 'src/modules/user/on-boarding/dto/on-boarding.dto';

@Injectable()
export class UserEntity extends Dao {
  constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {
    super(userModel);
  }
  async create(createUserDto: CreateOnboardingDto) {
    const user = await this.saveData(createUserDto);
    return user;
  }

  async getUserDetails(payload: any, projection: any = {}) {
    return await this.findOne(payload, projection);
  }
}
