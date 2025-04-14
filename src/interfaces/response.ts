export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  data?: T;
  meta?: ApiResponseMeta;
  error?: {
    code: string | undefined;
    details: string;
    stack?: string;
  };
  timestamp?: string;
  traceId?: string;
}

export interface PaginatedResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
}

export interface ApiResponseMeta {
  limit: number;
  page: number;
  total: number;
}
