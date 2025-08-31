class AppError extends Error {
  public statusCode: number;
  public path?: string; // ✅ Optional path

  constructor(statusCode: number, message: string, path?: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.path = path; // ✅ only set if provided

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
