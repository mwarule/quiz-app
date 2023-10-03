import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './authentication/authentication.module';
import { LayoutModule } from './layout/layout.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CoreModule } from './core/core.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { ClerkService } from './core/services/clerk.service';

function initializeClerk(clerkService: ClerkService): any {
  return () => clerkService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthenticationModule,
    LayoutModule,
    ToastModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ConfirmDialogModule,
    CoreModule,
    CurriculumModule
  ],
  providers: [
    MessageService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    ConfirmationService,
    { provide: APP_INITIALIZER, useFactory: initializeClerk, deps: [ClerkService], multi: true },
    ClerkService
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
