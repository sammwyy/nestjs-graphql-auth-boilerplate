import {
  BadRequestException,
  ValidationError,
  ValidationPipe as ValidationPipeBase,
} from '@nestjs/common';

const ValidationPipe = new ValidationPipeBase({
  forbidNonWhitelisted: true,
  skipMissingProperties: true,
  skipNullProperties: false,
  skipUndefinedProperties: false,
  stopAtFirstError: true,
  errorHttpStatusCode: 400,
  exceptionFactory: (errors: ValidationError[]): any => {
    const error = errors[0];
    const keys = Object.keys(error.constraints);
    const firstConstraint = error.constraints[keys[0]];
    throw new BadRequestException(
      'INVALID_' + error.property.toUpperCase() + '_FORMAT',
      firstConstraint,
    );
  },
});

export default ValidationPipe;
