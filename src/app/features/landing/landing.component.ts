import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <div class="text-center">
        <h1>Welcome to Splitwise</h1>
        <p>Redirecting...</p>
      </div>
    </div>
  `
})
export class LandingComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
