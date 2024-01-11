import { Body, Controller, Headers, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { CreateOnboardingDto, DeviceParamsDto } from 'src/modules/user/on-boarding/dto/on-boarding.dto';
import { UserOnBoardingService } from './on-boarding.service';

@ApiTags('Common : OnBoarding - User')
@Controller('/')
export class UserOnBoardingController {
  constructor(private readonly httpResponse: HttpResponse, private readonly userOnBoardingService: UserOnBoardingService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'sign api' })
  @ApiBasicAuth()
  @UseGuards(AuthGuard('basic'))
  async signup(@Body() createOnboardingDto: CreateOnboardingDto, @Headers() deviceParamsDto: DeviceParamsDto, @Res() response: Response) {
    const [status, result] = await this.userOnBoardingService.signUp(createOnboardingDto, deviceParamsDto);
    return this.httpResponse.sendResponse(response, status, result);
  }
}
