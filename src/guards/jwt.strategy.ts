import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONSTANT } from 'src/common/constant';
import { ENUM } from 'src/common/enum';
import { RESPONSE_MSG } from 'src/common/responses';
import { UserEntity } from 'src/entity/user.entity';
import { UserSessionEntity } from 'src/entity/userSession.entity';
@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'userPlandidJWT') {
  constructor(private readonly userEntity: UserEntity, private readonly userSessionEntity: UserSessionEntity) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONSTANT.JWT_PASSWORD,
    });
  }

  async validate(payload: { userId: string; sessionId: string }) {
    if (payload) {
      const [userData, sessionData] = await Promise.all([
        this.userEntity.findOne({ _id: payload.userId }),
        this.userSessionEntity.findOne({ _id: payload.sessionId, status: ENUM.USER_PROFILE_STATUS.ACTIVE }),
      ]);
      if (!sessionData) throw new UnauthorizedException(RESPONSE_MSG.SESSION_EXPIRED);
      if (!userData) throw new UnauthorizedException(RESPONSE_MSG.USER_NOT_EXIST);
    } else throw new UnauthorizedException(RESPONSE_MSG.INVALID_AUTHORIZATION_TOKEN);
  }
}
