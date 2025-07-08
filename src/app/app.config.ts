import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient,withInterceptors } from "@angular/common/http";
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { routes } from './app.routes';
import { authenticationInterceptor } from './iam/services/authentication.interceptor';

const httpLoaderFactory: (http: HttpClient) =>
  TranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    /* Zoneless / Change-Detection */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /* Rutas */
    provideRouter(routes),

    /* HttpClient con interceptores */
    provideHttpClient(
      withInterceptors([authenticationInterceptor])   // ⬅️ ¡registrado aquí!
    ),

    /* ngx-translate */
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
    }),
  ],
};