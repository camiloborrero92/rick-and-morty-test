import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './validation.schema';
import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: false,
      },
    }),  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}

