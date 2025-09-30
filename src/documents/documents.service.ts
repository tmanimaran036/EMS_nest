import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './typeORM/uploadORM';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepos: Repository<Document>,
  ) {}

  async saveFile(id, file: Express.Multer.File) {
    try {
      const newDoc = this.documentRepos.create({
        employee_id: id,
        filename: file.filename,
        filepath: file.path,
      });
      this.documentRepos.save(newDoc);
      return {
        message: 'File uploaded successfully!',
        employee_id: id,
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        path: `/uploads/${file.filename} `,
      };
    } catch {
      throw new BadRequestException('file uploading failed');
    }
  }
}
