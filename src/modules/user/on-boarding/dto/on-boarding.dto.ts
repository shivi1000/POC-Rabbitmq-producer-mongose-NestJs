import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class LoginDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  mobileNo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class OtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  expireTime?: Date;
  isVerified?: boolean;
}
export class DeviceParamsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ip: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  platform?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  devicetoken: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  deviceid?: string;
}
