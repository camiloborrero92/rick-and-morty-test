// src/common/interceptors/logger.graphql.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('GraphQL');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      
      // Check if this is actually a GraphQL context with valid info
      if (!info || !info.operation) {
        return next.handle();
      }
      
      const startTime = Date.now();
      const operation = info.operation.operation;
      const fieldName = info.fieldName;
    
      return next.handle().pipe(
        tap((result) => {
          const duration = Date.now() - startTime;
          this.logger.log(`✅ ${operation} ${fieldName} completed successfully in ${duration}ms`);
          
          if (result && Array.isArray(result)) {
            this.logger.debug(`📊 Returned ${result.length} items`);
          } else if (result) {
            this.logger.debug(`📊 Returned single item`);
          } else {
            this.logger.debug(`📊 Returned null/undefined`);
          }
        }),
        catchError((error) => {
          const duration = Date.now() - startTime;
          this.logger.error(`❌ ${operation} ${fieldName} failed after ${duration}ms`);
          this.logger.error(`Error: ${error.message}`);
          this.logger.debug(`Stack: ${error.stack}`);
          return throwError(() => error);
        })
      );
    } catch (error) {
      // If this is not a GraphQL context, just proceed without logging
      return next.handle();
    }
  }
}