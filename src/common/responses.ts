import { HttpStatus } from '@nestjs/common';

export const RESPONSE_MSG = {
  SUCCESS: 'Success.',
  ERROR: 'Something went wrong.',
  NOTIFICATION_SENT: 'Notification Sent Successfully.',
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
  NOTIFICATION_SENT: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.NOTIFICATION_SENT,
  },
};
