export interface TErrorSources {
      path: string;
      message: string;
};

export interface TErrorResponse {
      statusCode: string;
      message: string;
      error: TErrorSources[];
};