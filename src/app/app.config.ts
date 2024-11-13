import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';//Loading spinner

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { provideToastr } from 'ngx-toastr';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReCaptchaV3Provider } from '@angular/fire/app-check';
import { provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(ReCaptchaV3Provider),
    provideAnimationsAsync(), //loading spinner and toastr
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideToastr({timeOut:4000,preventDuplicates:true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "clinicasabarino",
      appId: "1:1083460240282:web:af27db556825929d2cf023",
      storageBucket: "clinicasabarino.appspot.com",
      apiKey: "AIzaSyDZX-SjXCrUQIf1LTYyrG3gzBbSI027nkQ",
      authDomain: "clinicasabarino.firebaseapp.com",
      messagingSenderId: "1083460240282"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};