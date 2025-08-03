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
  RegisterData,
  User,
} from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);

  // Signal-basierte Properties
  readonly isLoading$ = signal(false);
  readonly hidePassword$ = signal(true);
  readonly hideConfirmPassword$ = signal(true);
  readonly errorMessage$ = signal<string | null>(null);

  registerForm: FormGroup;

  // Computed Signals
  readonly buttonText$ = computed(() =>
    this.isLoading$()
      ? this.translateService.instant('register.creating.account')
      : this.translateService.instant('register.create.account')
  );

  readonly isFormValid$ = computed(() => this.registerForm?.valid || false);

  constructor() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading$.set(true);
      this.errorMessage$.set(null);
      const formValue = this.registerForm.value;

      // Map form values to RegisterData interface
      const registerData: RegisterData = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
      };

      this.authService.register(registerData).subscribe({
        next: (user: User) => {
          this.isLoading$.set(false);
          console.log('Registration successful', user);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.isLoading$.set(false);
          this.errorMessage$.set(error.message || 'Registration failed');
          console.error('Registration failed', error);
        },
      });
    }
  }

  getFirstNameErrorMessage(): string {
    const control = this.registerForm.get('firstName');
    if (control?.hasError('required')) {
      return this.translateService.instant('register.firstname.required');
    }
    if (control?.hasError('minlength')) {
      return this.translateService.instant('register.firstname.minlength');
    }
    return '';
  }

  getLastNameErrorMessage(): string {
    const control = this.registerForm.get('lastName');
    if (control?.hasError('required')) {
      return this.translateService.instant('register.lastname.required');
    }
    if (control?.hasError('minlength')) {
      return this.translateService.instant('register.lastname.minlength');
    }
    return '';
  }

  getEmailErrorMessage(): string {
    const control = this.registerForm.get('email');
    if (control?.hasError('required')) {
      return this.translateService.instant('register.email.required');
    }
    if (control?.hasError('email')) {
      return this.translateService.instant('register.email.invalid');
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const control = this.registerForm.get('password');
    if (control?.hasError('required')) {
      return this.translateService.instant('register.password.required');
    }
    if (control?.hasError('minlength')) {
      return this.translateService.instant('register.password.minlength');
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const control = this.registerForm.get('confirmPassword');
    if (control?.hasError('required')) {
      return this.translateService.instant(
        'register.confirm.password.required'
      );
    }
    if (control?.hasError('passwordMismatch')) {
      return this.translateService.instant(
        'register.confirm.password.mismatch'
      );
    }
    return '';
  }

  togglePasswordVisibility(): void {
    this.hidePassword$.update((value: boolean) => !value);
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword$.update((value: boolean) => !value);
  }
}
