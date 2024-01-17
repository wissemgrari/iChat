import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFound } from './pages/notfound/notfound.component';
import { ChatComponent } from './pages/chat/chat.component';
import { authGuard } from './auth/auth.guard';
import { loggedInAuthGuard } from './auth/logged-in.auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard], },
  { path: 'login', component: LoginComponent, canActivate: [loggedInAuthGuard] },
  { path: 'chat/:id', component: ChatComponent, canActivate: [authGuard] },
  { path: '**', component: NotFound },
];
