import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  public readonly supportedLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  constructor() {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setLanguage(languageCode: string): void {
    if (this.isLanguageSupported(languageCode)) {
      this.currentLanguageSubject.next(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);

      // In a production app, you would reload the app with the new locale
      // For demo purposes, we'll just store the preference
      console.log(`Language changed to: ${languageCode}`);
    }
  }

  private isLanguageSupported(languageCode: string): boolean {
    return this.supportedLanguages.some(lang => lang.code === languageCode);
  }

  getLanguageName(code: string): string {
    const language = this.supportedLanguages.find(lang => lang.code === code);
    return language ? language.name : code;
  }

  getLanguageFlag(code: string): string {
    const language = this.supportedLanguages.find(lang => lang.code === code);
    return language ? language.flag : '🌐';
  }
}
