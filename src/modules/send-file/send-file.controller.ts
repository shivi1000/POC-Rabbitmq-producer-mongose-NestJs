import { Body, Controller, Next, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiTags } from '@nestjs/swagger';
import { FileUploadService } from './send-file.service';
import { HttpResponse } from 'src/common/httpResponse';
import { Response } from 'express';

@ApiTags('file-upload')
@Controller('/')
export class FileUploadController {
  constructor(private readonly httpResponse: HttpResponse, private readonly fileUploadService: FileUploadService) {}
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Res() response: Response, @Body() body: { userEmails: string[] }) {
    try {
      console.log('inside try--------------->', file);
      const userEmails = body.userEmails || [];
      const [status, result] = await this.fileUploadService.uploadFile(file, userEmails);
      return this.httpResponse.sendResponse(response, status, result);
    } catch (error) {
      console.error('error', error);
    }
  }
}
