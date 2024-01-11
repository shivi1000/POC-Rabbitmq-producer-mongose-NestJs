import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateOnboardingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  @IsOptional()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobileNo: string;
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
