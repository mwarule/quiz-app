import { Injectable } from '@angular/core';
import {
  Auth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
  onAuthStateChanged,
  User,
  IdTokenResult,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly user$ = new BehaviorSubject<User | null>(null);
  isAdmin = false;
  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((auth: User | null) => {
      this.user$.next(auth)
      auth?.getIdTokenResult().then((token: any) => this.isAdmin = token.claims['admin']);
    });
  }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return this.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }

  sendVerificationMail(user: User): Observable<any> {
    return from(sendEmailVerification(user));
  }

  resolveAuthErrors(code: string): string {
    switch (code) {
      case 'auth/invalid-login-credentials': {
          return 'Invalid login credentials';
      }
      case 'auth/email-already-in-use': {
        return 'The email address is already in use by another account';
      }
      case 'auth/weak-password': {
        return 'Password should be at least 6 characters';
      }
      default: {
          return 'Error occured, please try again later.';
      }
    }
  }
}
