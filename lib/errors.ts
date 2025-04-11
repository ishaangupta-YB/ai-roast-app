// Custom error class for better error handling
export class ServerActionError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ServerActionError';
    this.statusCode = statusCode;
  }
} 