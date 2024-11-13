import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechaptchaService {
  http = inject( HttpClient)

  captchaGoogle: any = {
    passwordWeb: "6LeCCn0qAAAAAF8ejgq1XQWoXuq4WlW8Lsct0seK",
    secretPassword:"6LeCCn0qAAAAALyDH_x2UwKtrBvX8z2HDoLTWYp_"
}

  constructor() { }

  validateRecaptcha(token: string): Observable<any> {
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const body = new URLSearchParams();
    body.set('secret', this.captchaGoogle.secretPassword);
    body.set('response', token);

    return this.http.post(url, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
