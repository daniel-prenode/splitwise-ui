import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import {
  AuthService,
  LoginCredentials,
  User,
} from '../../../core/services/auth.service';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  // Translation strings
  emailPlaceholder = $localize`:@@login.email.placeholder:Enter your email`;
  passwordPlaceholder = $localize`:@@login.password.placeholder:Enter your password`;
  signInText = $localize`:@@login.signin.button:Sign In`;
  signingInText = $localize`:@@login.signing.in:Signing In...`;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials: LoginCredentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (user: User) => {
          this.isLoading = false;
          console.log('Login successful', user);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Login failed', error);
          // TODO: Show error message to user
        },
      });
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return $localize`:@@login.email.required:Email is required`;
    }
    if (emailControl?.hasError('email')) {
      return $localize`:@@login.email.invalid:Please enter a valid email`;
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return $localize`:@@login.password.required:Password is required`;
    }
    if (passwordControl?.hasError('minlength')) {
      return $localize`:@@login.password.minlength:Password must be at least 6 characters`;
    }
    return '';
  }
}
