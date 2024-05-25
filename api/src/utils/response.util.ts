// src/utils/response.util.ts
import { HttpStatus } from '@nestjs/common';

export function createResponse(
  statusCode: HttpStatus,
  resultCode: number,
  message: string,
  data: any = null,
) {
  return {
    statusCode,
    resultCode,
    message,
    data,
  };
}
