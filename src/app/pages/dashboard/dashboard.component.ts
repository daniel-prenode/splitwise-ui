import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService, User } from '../../core/services/auth.service';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    TranslateModule,
    ToolbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly translateService = inject(TranslateService);

  i18nPrefix = 'dashboard.';

  // Signal-basierte Properties
  readonly currentUser$: Signal<User | null> = this.authService.currentUser$;
  readonly isLoading$ = signal(false);
  readonly lastActivity$ = signal(new Date());

  // Computed Signals
  readonly displayName$: Signal<string> = computed(() => {
    const user = this.currentUser$();
    return user ? `${user.firstName} ${user.lastName}` : 'Guest';
  });

  readonly userInitials$: Signal<string> = computed(() => {
    const user = this.currentUser$();
    if (!user) return 'G';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  });

  readonly welcomeMessage$: Signal<string> = computed(() => {
    const user = this.currentUser$();
    if (!user) return this.translateService.instant('dashboard.welcome.title');
    return this.translateService.instant('dashboard.welcome.user', {
      firstName: user.firstName,
    });
  });

  readonly isAuthenticated$: Signal<boolean> = computed(() =>
    this.authService.isAuthenticated$()
  );
  logout(): void {
    this.isLoading$.set(true);
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  refreshData(): void {
    this.isLoading$.set(true);
    this.lastActivity$.set(new Date());
    // Simulate data refresh
    setTimeout(() => {
      this.isLoading$.set(false);
    }, 1000);
  }
}
