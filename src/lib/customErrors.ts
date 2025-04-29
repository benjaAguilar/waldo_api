class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message), (this.statusCode = statusCode);
  }
}

class ValidationError extends Error {
  statusCode: number;
  validationErrors: Array<object>;
  constructor(
    message: string,
    statusCode: number,
    validationErrors: Array<object>,
  ) {
    super(message), (this.statusCode = statusCode);
    this.validationErrors = validationErrors;
  }
}

class InternalError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message), (this.statusCode = statusCode);
  }
}

class DbError extends Error {
  statusCode: number;
  dbErr: Error;
  constructor(message: string, statusCode: number, dbErr: Error) {
    super(message), (this.statusCode = statusCode);
    this.dbErr = dbErr;
  }
}

export { DbError, ValidationError, CustomError, InternalError };
