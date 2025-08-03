import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AuthService,
  LoginCredentials,
  User,
} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);

  // Signal-basierte Properties
  readonly isLoading$ = signal(false);
  readonly hidePassword$ = signal(true);
  readonly errorMessage$ = signal<string | null>(null);

  loginForm: FormGroup;

  // Computed Signals
  readonly buttonText$ = computed(() =>
    this.isLoading$()
      ? this.translateService.instant('login.signin.progress')
      : this.translateService.instant('login.signin.button')
  );

  readonly isFormValid$ = computed(() => this.loginForm?.valid || false);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Debug: Check if translations are loading
    this.translateService
      .get('login.welcome.title')
      .subscribe((translation) => {
        console.log('Translation loaded:', translation);
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading$.set(true);
      this.errorMessage$.set(null);
      const credentials: LoginCredentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (user: User) => {
          this.isLoading$.set(false);
          console.log('Login successful', user);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.isLoading$.set(false);
          this.errorMessage$.set(error.message || 'Login failed');
          console.error('Login failed', error);
        },
      });
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return this.translateService.instant('login.email.required');
    }
    if (emailControl?.hasError('email')) {
      return this.translateService.instant('login.email.invalid');
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return this.translateService.instant('login.password.required');
    }
    if (passwordControl?.hasError('minlength')) {
      return this.translateService.instant('login.password.minlength');
    }
    return '';
  }

  togglePasswordVisibility(): void {
    this.hidePassword$.update((value: boolean) => !value);
  }
}
