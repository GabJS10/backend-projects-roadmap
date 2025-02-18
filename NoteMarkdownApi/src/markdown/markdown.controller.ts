import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MarkdownService } from './markdown.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';

@Controller('markdown')
export class MarkdownController {
  constructor(private readonly markdownService: MarkdownService) {}

  @Post('check-grammar')
  @UseInterceptors(FileInterceptor('file'))
  async checkMarkdown(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    if (file.mimetype !== 'text/markdown') {
      throw new HttpException('Invalid file type', HttpStatus.BAD_REQUEST);
    }

    return this.markdownService.checkGrammar(file);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
      fileFilter: function (req, file, cb) {
        file.mimetype !== 'text/markdown'
          ? cb(
              new HttpException('Invalid file type', HttpStatus.BAD_REQUEST),
              false,
            )
          : cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'File uploaded successfully',
      filename: file.filename,
    };
  }

  @Get('notes')
  async getNotes() {
    const names = await this.markdownService.getNotes();

    if (names.length === 0) {
      throw new HttpException('No notes found', HttpStatus.NOT_FOUND);
    }

    return names;
  }

  @Get('transform')
  async transformMarkdown(@Query('filename') fileName: string) {
    if (!fileName) {
      throw new HttpException('No filename provided', HttpStatus.BAD_REQUEST);
    }

    return this.markdownService.transformMarkdown(fileName);
  }
}
