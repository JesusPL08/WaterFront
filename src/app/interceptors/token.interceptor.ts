import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    try {
      token = localStorage.getItem('access_token');
    } catch (e) {
      console.error('Acceso a localStorage fallido:', e);
    }
  }

  const authReq = token && !req.url.includes('/auth/login')
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    tap({
      error: (err: any) => {
        if (err.status === 401 && isPlatformBrowser(platformId)) {
          try {
            localStorage.removeItem('access_token');
          } catch (e) {
            console.error('Error limpiando token:', e);
          }
          router.navigate(['/']);
        }
      }
    })
  );
};
