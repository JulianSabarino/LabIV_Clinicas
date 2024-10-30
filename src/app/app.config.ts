import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';//Loading spinner

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(), //loading spinner
    provideZoneChangeDetection({ eventCoalescing: true }),
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
    provideFirestore(() => getFirestore())
  ]
};