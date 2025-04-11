export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  data?: T;
  error?: {
    code: string | undefined;
    details: string;
    stack?: string;
  };
  timestamp?: string;
  traceId?: string;
}
