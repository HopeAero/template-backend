import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { AuthService } from "@src/module/auth/service/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    let tokenArray = req.headers.authorization;
    if (tokenArray) {
      req.body["user"] = this.authService.decodeToken(tokenArray.split(" ")[1]).user;
    }

    return next
      .handle()
      .pipe
      // \\tap(() => console.log(``)),
      ();
  }
}
