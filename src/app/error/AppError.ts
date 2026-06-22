class AppError extends Error {
      public statusCode: number;

      constructor(statusCode: number, message: string) {
            super();
            this.statusCode = statusCode;

            Error.captureStackTrace(this, this.constructor);
      }
};

export default AppError;