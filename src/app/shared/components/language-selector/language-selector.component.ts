import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, MatIconModule],
  template: `
    <mat-form-field appearance="outline" class="language-selector">
      <mat-label i18n="@@language.label">Language</mat-label>
      <mat-select
        [value]="languageService.getCurrentLanguage()"
        (selectionChange)="onLanguageChange($event.value)">
        <mat-option value="en">
          <span class="flag-icon">🇺🇸</span>
          <span i18n="@@language.english">English</span>
        </mat-option>
        <mat-option value="de">
          <span class="flag-icon">🇩🇪</span>
          <span i18n="@@language.german">Deutsch</span>
        </mat-option>
      </mat-select>
      <mat-icon matPrefix>language</mat-icon>
    </mat-form-field>
  `,
  styles: [`
    .language-selector {
      min-width: 140px;
    }

    .flag-icon {
      margin-right: 8px;
      font-size: 16px;
    }

    mat-option {
      display: flex;
      align-items: center;
    }

    mat-icon {
      color: rgba(0, 0, 0, 0.54);
      margin-right: 8px;
    }
  `]
})
export class LanguageSelectorComponent {
  languageService = inject(LanguageService);

  onLanguageChange(language: string): void {
    this.languageService.setLanguage(language);
  }
}
