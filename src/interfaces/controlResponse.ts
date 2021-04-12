interface ControllerResponse {
  statusCode: number;
  data?: Record<string, unknown>[] | Record<string, unknown> | number | string | null | undefined;
  message?: string;
}

export default ControllerResponse;
