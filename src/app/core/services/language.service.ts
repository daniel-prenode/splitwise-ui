import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selected-language';
  private readonly DEFAULT_LANGUAGE = 'en';

  private currentLanguageSubject = new BehaviorSubject<string>(this.getInitialLanguage());
  public currentLanguage$: Observable<string> = this.currentLanguageSubject.asObservable();

  private readonly availableLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
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
    return this.currentLanguageSubject.value;
  }

  setLanguage(languageCode: string): void {
    if (this.isLanguageSupported(languageCode)) {
      this.currentLanguageSubject.next(languageCode);
      localStorage.setItem(this.STORAGE_KEY, languageCode);

      // For production, you would typically reload the app or use Angular's LOCALE_ID
      // For now, we'll just store the preference
      console.log(`Language changed to: ${languageCode}`);

      // In a real app, you might want to reload the page with the new locale
      // window.location.reload();
    }
  }

  getAvailableLanguages(): Language[] {
    return this.availableLanguages;
  }

  private isLanguageSupported(languageCode: string): boolean {
    return this.availableLanguages.some(lang => lang.code === languageCode);
  }

  // Get language display name
  getLanguageName(code: string): string {
    const language = this.availableLanguages.find(lang => lang.code === code);
    return language ? language.name : this.DEFAULT_LANGUAGE;
  }

  // Get language flag emoji
  getLanguageFlag(code: string): string {
    const language = this.availableLanguages.find(lang => lang.code === code);
    return language ? language.flag : '🇺🇸';
  }
}
