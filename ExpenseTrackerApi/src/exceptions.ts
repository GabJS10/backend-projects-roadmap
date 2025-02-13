import { HttpStatus, HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class ForeingKeyException extends HttpException {
  constructor(entityName: string, id: number | string) {
    super(`${entityName} with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class DatabaseException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class EntityNotFoundException extends HttpException {
  constructor(entityName: string, id?: number | string) {
    const message = id
      ? `${entityName} with ID ${id} not found`
      : `${entityName} not found`;
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class PermissionDeniedException extends HttpException {
  constructor(message: string = 'Permission denied') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
