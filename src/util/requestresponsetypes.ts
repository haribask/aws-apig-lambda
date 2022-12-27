export interface NotifyAccountStatusRequest {
    requestingAppName: string
    body: object;
  }
export interface ServiceResponse<T> {
    success: boolean;
    errorCode?: number | null;
    errorMessage?: string;
    item?: T;
}  
