import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import { Request, Response } from 'express';
import {exec} from "child_process";

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status =
            exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        //miejsce na logowanie błędów w aplikacji
            console.error(exception);
        response
            .status(status)
            .json({
                statusCode: status,
                isOk:false,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}