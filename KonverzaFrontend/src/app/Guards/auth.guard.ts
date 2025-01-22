import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.isAuthenticated()){
    return true;
  }else{
    return router.navigate(["/login"]);
  }

};
