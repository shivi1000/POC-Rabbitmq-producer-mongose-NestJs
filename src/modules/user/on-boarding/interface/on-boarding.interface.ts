export interface UserDetails {
  _id: string;
  email: string;
  password: string;
  name: string;
}

export interface CreateUserSession {
  userId: string;
  ipAddress?: string;
  deviceType?: number;
  deviceToken?: string;
}

export interface SessionData {
  id: string;
}
export interface Otp {
  otp: string;
  ExpireTime: Date;
  isVerified: boolean;
}
