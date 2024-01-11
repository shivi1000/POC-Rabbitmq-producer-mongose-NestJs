import { HttpStatus } from '@nestjs/common';

export const RESPONSE_MSG = {
  SUCCESS: 'Success.',
  ERROR: 'Something went wrong.',
  VERIFY_OTP: 'OTP verified successfully.',
  USER_NOT_EXIST: 'User not exists.',
  INVALID_OTP: 'Incorrect OTP.',
  SESSION_EXPIRED: 'Session Expired.',
  INVALID_AUTHORIZATION_TOKEN: 'Invalid authorization token.',
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
  VERIFY_OTP: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.VERIFY_OTP,
  },
  USER_NOT_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.USER_NOT_EXIST,
  },
  INVALID_OTP: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.INVALID_OTP,
  },
};
