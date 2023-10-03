import { AuthPipe, loggedIn, customClaims, redirectUnauthorizedTo, redirectLoggedInTo, emailVerified, AuthPipeGenerator } from "@angular/fire/auth-guard";
import { pipe, mergeMap, forkJoin, of, map } from "rxjs";

export const adminOnly: AuthPipe = pipe(
  mergeMap((user) => forkJoin([loggedIn(of(user)), customClaims(of(user as any))])),
  map(([isLoggedIn, customClaims]) => {
    console.log({ isLoggedIn, customClaims });
    if (!isLoggedIn) {
      return '';
    }
    if (!customClaims.admin) {
      return '/dashboard';
    }
    return true;
  }),
);

export const userOnly: AuthPipe = pipe(
  mergeMap((user) => forkJoin([loggedIn(of(user)), customClaims(of(user as any))])),
  map(([isLoggedIn, customClaims]) => {
    console.log({ isLoggedIn, customClaims });
    if (!isLoggedIn) {
      return 'auth/login';
    }
    if(!customClaims['email_verified']) {
      return 'verify-email'
    }
    if (customClaims.admin) {
      return '/admin-dashboard';
    }
    return true;
  })
);

export const redirectVerfiedUser = () =>
  pipe(
    emailVerified,
    map(emailVerified => {
      if (!emailVerified) {
        return true;
      } else {
        return '/dashboard'
      }
    })
  );

export const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);