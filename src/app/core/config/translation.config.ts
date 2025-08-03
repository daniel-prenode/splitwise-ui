import { HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    const url = `./assets/i18n/${lang}.json`;
    console.log('Loading translation file:', url);
    return this.http.get(url);
  }
}

export function createTranslateLoader(http: HttpClient): CustomTranslateLoader {
  return new CustomTranslateLoader(http);
}

export const provideTranslation = () => [
  importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    })
  ),
];
