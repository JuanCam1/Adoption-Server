import type { Response } from "express";

type stateType = "success" | "error";

export const sendResponse = <T>(res: Response, state: stateType, code: number, message: string, data: T) => {
  return res.status(code).json({
    state,
    code,
    message,
    data
  })
}