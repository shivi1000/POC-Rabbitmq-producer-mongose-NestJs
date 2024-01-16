import { Connection } from 'mongoose';
import { ENUM } from 'src/common/enum';
import { NotificationSchema } from './notification.schema';

export const schemaProviders = [
  {
    provide: 'NOTIFICATION_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.NOTIFICATION, NotificationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
