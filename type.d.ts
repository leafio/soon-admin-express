import express, { Response } from "express"
export {}
declare global {
  namespace Express {
    export interface Response {
      success(data?: any): void
      err(msg: string, code?: number): void
    }
    export interface Request {
      username: string
    }
  }
}
