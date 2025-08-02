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
  RegisterData,
  User,
} from '../../../core/services/auth.service';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  // Translation strings
  firstNamePlaceholder = $localize`:@@register.firstname.placeholder:Enter your first name`;
  lastNamePlaceholder = $localize`:@@register.lastname.placeholder:Enter your last name`;
  emailPlaceholder = $localize`:@@register.email.placeholder:Enter your email`;
  passwordPlaceholder = $localize`:@@register.password.placeholder:Create a password`;
  confirmPasswordPlaceholder = $localize`:@@register.confirm.password.placeholder:Confirm your password`;
  createAccountText = $localize`:@@register.create.account:Create Account`;
  creatingAccountText = $localize`:@@register.creating.account:Creating Account...`;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
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
      this.isLoading = true;
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
          this.isLoading = false;
          console.log('Registration successful', user);
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Registration failed', error);
          // TODO: Show error message to user
        },
      });
    }
  }

  getFirstNameErrorMessage(): string {
    const control = this.registerForm.get('firstName');
    if (control?.hasError('required')) {
      return $localize`:@@register.firstname.required:First name is required`;
    }
    if (control?.hasError('minlength')) {
      return $localize`:@@register.firstname.minlength:First name must be at least 2 characters`;
    }
    return '';
  }

  getLastNameErrorMessage(): string {
    const control = this.registerForm.get('lastName');
    if (control?.hasError('required')) {
      return $localize`:@@register.lastname.required:Last name is required`;
    }
    if (control?.hasError('minlength')) {
      return $localize`:@@register.lastname.minlength:Last name must be at least 2 characters`;
    }
    return '';
  }

  getEmailErrorMessage(): string {
    const control = this.registerForm.get('email');
    if (control?.hasError('required')) {
      return $localize`:@@register.email.required:Email is required`;
    }
    if (control?.hasError('email')) {
      return $localize`:@@register.email.invalid:Please enter a valid email`;
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const control = this.registerForm.get('password');
    if (control?.hasError('required')) {
      return $localize`:@@register.password.required:Password is required`;
    }
    if (control?.hasError('minlength')) {
      return $localize`:@@register.password.minlength:Password must be at least 6 characters`;
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const control = this.registerForm.get('confirmPassword');
    if (control?.hasError('required')) {
      return $localize`:@@register.confirm.password.required:Please confirm your password`;
    }
    if (control?.hasError('passwordMismatch')) {
      return $localize`:@@register.confirm.password.mismatch:Passwords do not match`;
    }
    return '';
  }
}
