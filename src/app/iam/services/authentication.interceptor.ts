import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const authenticationInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  console.log('[AUTH-INT]', request.method, request.url);
  const publicUrls = [
    '/api/v1/authentication/sign-up',
    '/api/v1/authentication/sign-in'
  ];

  const isPublic = publicUrls.some(url => request.url.includes(url));

  if (isPublic) {
    return next(request); // no agregamos token
  }

  const token = localStorage.getItem('token');
  const handledRequest = token
    ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
    : request;

  return next(handledRequest);
};
