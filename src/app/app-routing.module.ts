import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/components/app-layout/app-layout.component';
import { UserProfileComponent } from './core/components/user-profile/user-profile.component';
import { ProfileMessageCardComponent } from './core/components/profile-message-card/profile-message-card.component';
import { canActivate } from '@angular/fire/auth-guard';
import { adminOnly, redirectLoggedInToDashboard, redirectVerfiedUser, userOnly } from './core/utils/guards';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
    ...canActivate(redirectLoggedInToDashboard)
  },
  {
    path: 'admin-dashboard',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin-dashboard/admin-dashboard.module').then((m) => m.AdminDashboardModule),
      },
    ],
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: () => adminOnly }
  },
  {
    path: 'questions',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./questions/questions.module').then((m) => m.QuestionsModule),
      },
    ],
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: () => adminOnly }
  },
  {
    path: 'tags',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./tags/tags.module').then((m) => m.TagsModule),
      },
    ],
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: () => adminOnly }
  },
  {
    path: 'quizs',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./quiz/quiz.module').then((m) => m.QuizModule),
      },
    ],
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: () => adminOnly }
  },
  {
    path: 'curriculum',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./curriculum/curriculum.module').then((m) => m.CurriculumModule),
      },
    ],
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: () => userOnly }
  },
  {
    path: 'dashboard',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./user-dashboard/user-dashboard.module').then((m) => m.UserDashboardModule),
      },
    ],
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: () => userOnly }
  },
  {
    path: 'profile', component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: UserProfileComponent
      },
    ]
  },
  {
    path: 'verify-email',
    component: ProfileMessageCardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectVerfiedUser }
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
