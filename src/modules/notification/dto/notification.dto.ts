import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ENUM } from 'src/common/enum';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsEnum([ENUM.NOTIFICATION_TYPE.PUSH])
  notificationType: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isSent: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  receiverIds?: string[];
}
