import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import removeMd from 'remove-markdown';
import { Match } from './apiMatch.type';
import path from 'path';
import { marked } from 'marked';
import { readdir, readFile } from 'fs/promises';
@Injectable()
export class MarkdownService {
  async checkGrammar(file: Express.Multer.File) {
    const text = removeMd(file.buffer.toString('utf-8'));

    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        language: 'es-ES',
      }),
    });

    if (!response.ok) {
      throw new HttpException(
        'Error checking grammar',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const data = await response.json();

    if (!data || !data.matches) {
      throw new HttpException(
        'Unexpected response from LanguageTool',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = data.matches.map((match: Match) => ({
      message: match.message,
      replacement: match.replacements.map((r) => r.value).join(', '),
      context: match.context.text,
    }));

    return result;
  }

  async transformMarkdown(fileName: string) {
    const notes = await this.getNotes();

    const note = notes.find((n) => n === fileName);

    if (!note) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    const filePath = path.join('./uploads', note);

    const data = await readFile(filePath, 'utf-8');

    return marked.parse(data);
  }

  async getNotes() {
    return await readdir('./uploads');
  }
}
