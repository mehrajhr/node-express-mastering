import type { ServerResponse } from "node:http";

export const sendResponse = (
  res: ServerResponse,
  statuscode: number,
  success: boolean,
  message: string,
  data?: any,
) => {
  const response = {
    success,
    message,
    data,
  };
  res.writeHead(statuscode, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
};
