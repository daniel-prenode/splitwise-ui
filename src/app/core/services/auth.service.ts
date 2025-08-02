import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  computed,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'currentUser';

  private _currentUser$: WritableSignal<User | null> = signal(null);
  public currentUser$: Signal<User | null> = this._currentUser$.asReadonly();
  public isAuthenticated$: Signal<boolean> = computed(() => {
    const user = this._currentUser$();
    if (!user) return false;

    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return false;

    // Check if token is expired (basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  });

  constructor(private http: HttpClient) {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem(this.USER_KEY);
    const savedToken = localStorage.getItem(this.TOKEN_KEY);

    if (savedUser && savedToken) {
      this._currentUser$.set(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.http
      .post<
        ApiResponse<AuthResponse>
      >(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            const { user, token } = response.data;
            this.setAuthData(user, token);
            return user;
          }
          throw new Error(response.message || 'Login failed');
        }),
        catchError(this.handleError)
      );
  }

  register(userData: RegisterData): Observable<User> {
    return this.http
      .post<
        ApiResponse<AuthResponse>
      >(`${this.API_URL}/auth/register`, userData)
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            const { user, token } = response.data;
            this.setAuthData(user, token);
            return user;
          }
          throw new Error(response.message || 'Registration failed');
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this._currentUser$.set(null);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this._currentUser$();
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setAuthData(user: User, token: string): void {
    this._currentUser$.set(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = 'An error occurred';

    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.error?.error) {
      errorMessage = error.error.error;
    } else if (error.message) {
      errorMessage = error.message;
    }

    console.error('Auth Service Error:', error);
    return throwError(() => new Error(errorMessage));
  };
}
