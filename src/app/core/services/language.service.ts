import { inject, Injectable, signal, Signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selected-language';
  private readonly DEFAULT_LANGUAGE = 'de';
  private translateService = inject(TranslateService);

  private currentLanguage$ = signal<string>(this.getInitialLanguage());
  public currentLanguage: Signal<string> = this.currentLanguage$.asReadonly();

  private readonly availableLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  constructor() {
    // Initialize language from storage or browser preference
    const savedLanguage = this.getInitialLanguage();
    this.setLanguage(savedLanguage);
  }

  private getInitialLanguage(): string {
    // Check localStorage first
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY);
    if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      return savedLanguage;
    }

    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    if (this.isLanguageSupported(browserLanguage)) {
      return browserLanguage;
    }

    return this.DEFAULT_LANGUAGE;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage$();
  }

  setLanguage(languageCode: string): void {
    if (this.isLanguageSupported(languageCode)) {
      this.currentLanguage$.set(languageCode);
      localStorage.setItem(this.STORAGE_KEY, languageCode);
      // Use ngx-translate to change the language
      this.translateService.use(languageCode);

      console.log(`Language changed to: ${languageCode}`);
    }
  }

  getAvailableLanguages(): Language[] {
    return this.availableLanguages;
  }

  private isLanguageSupported(languageCode: string): boolean {
    return this.availableLanguages?.some((lang) => lang.code === languageCode);
  }

  // Get language display name
  getLanguageName(code: string): string {
    const language = this.availableLanguages.find((lang) => lang.code === code);
    return language ? language.name : this.DEFAULT_LANGUAGE;
  }

  // Get language flag emoji
  getLanguageFlag(code: string): string {
    const language = this.availableLanguages.find((lang) => lang.code === code);
    return language ? language.flag : '🇺🇸';
  }
}
