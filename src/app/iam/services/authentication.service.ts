import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignInRequest } from '../model/sign-in.request';
import { SignInResponse } from '../model/sign-in.response';
import { SignUpRequest } from '../model/sign-up.request';
import { SignUpResponse } from '../model/sign-up.response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private basePath: string = `${environment.serverBasePath}/authentication`;

  private signedIn = new BehaviorSubject<boolean>(false);
  private signedInUserId = new BehaviorSubject<number>(0);
  private signedInUsername = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  // Observables públicos
  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  getSignedInUserId(): number {
    return this.signedInUserId.value;
  }

  getSignedInUsername(): string {
    return this.signedInUsername.value;
  }


  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  /**
   * Sign up a new user (POST /authentication/sign-up)
   */
  signUp(signUpRequest: SignUpRequest): Observable<SignUpResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SignUpResponse>(
      `${this.basePath}/sign-up`,
      signUpRequest,
      { headers }  // No token, solo content-type
    );
  }

  /**
   * Sign in a user (POST /authentication/sign-in)
   */
  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SignInResponse>(
      `${this.basePath}/sign-in`,
      signInRequest,
      { headers }
    );
  }

  /**
   * Process successful login: sets state, saves token
   */
  handleSignInSuccess(response: SignInResponse) {
    this.signedIn.next(true);
    this.signedInUserId.next(response.id);
    this.signedInUsername.next(response.username);
    localStorage.setItem('token', response.token);
  }

  /**
   * Clear session and sign out
   */
  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    localStorage.removeItem('token');
  }
}
