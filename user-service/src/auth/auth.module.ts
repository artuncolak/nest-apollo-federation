import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { UserModule } from 'src/user/user.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
