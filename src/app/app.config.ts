import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
provideHttpClient(
  withFetch(),
  withInterceptors([TokenInterceptor])
),
provideAnimations(),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
