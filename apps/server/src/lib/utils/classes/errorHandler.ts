import logger from "@/middlewares/logger.middleware";
import BaseError from "./baseError";

class ErrorHandler {
  logger;

  constructor(logger: any) {
    this.logger = logger;
  }

  public async handleError(err: Error): Promise<void> {
    logger.error(err);
  }

  public isTrustedError(error: Error) {
    return error instanceof BaseError && error.isOperational;
  }
}
export default ErrorHandler;
