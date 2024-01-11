import { HttpStatus } from '@nestjs/common';

export const RESPONSE_MSG = {
  SUCCESS: 'Success.',
  ERROR: 'Something went wrong.',
  SESSION_EXPIRED: 'Session Expired.',
  MOBILE_NO_ALREADY_EXIST: 'Entered Phone number already',
  INVALID_AUTHORIZATION_TOKEN: 'Invalid authorization token.',
  USER_NOT_EXIST: 'User not exists.',
};

export const RESPONSE_DATA = {
  SUCCESS: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.SUCCESS,
  },
  ERROR: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.ERROR,
  },
  MOBILE_NO_ALREADY_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.MOBILE_NO_ALREADY_EXIST,
  },
};
