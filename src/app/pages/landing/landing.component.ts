import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Signal-basierte Properties
  readonly isRedirecting$ = signal(true);
  readonly redirectMessage$ = signal('Redirecting...');

  // Computed Signal für bessere UX
  readonly displayMessage$ = computed(() => {
    if (this.isRedirecting$()) {
      return this.redirectMessage$();
    }
    return 'Welcome to Splitwise';
  });

  constructor() {
    // Effect für automatische Navigation basierend auf Auth-Status
    effect(() => {
      const isAuthenticated = this.authService.isAuthenticated$();
      if (isAuthenticated) {
        this.redirectMessage$.set('Taking you to dashboard...');
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      } else {
        this.redirectMessage$.set('Taking you to login...');
        setTimeout(() => this.router.navigate(['/login']), 1000);
      }
    });
  }

  ngOnInit(): void {
    // Zusätzliche Logik kann hier implementiert werden
  }
}
