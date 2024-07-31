import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './shared/auth.guard';
import { TagViewComponent } from './tag-view/tag-view.component';
import { TagsViewComponent } from './tags-view/tags-view.component';
import { ViewOverlayComponent } from './view-overlay/view-overlay.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tag-view',
    component: TagsViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tag-view/:tagName',
    component: TagViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileViewComponent,
    canActivate: [authGuard],
  },
];
