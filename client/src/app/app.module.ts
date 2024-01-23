import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  RouterModule,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ButtonComponent } from './components/button.component';
import { InputComponent } from './components/input.component';
import { AvatarComponent } from './components/avatar.component';
import { SearchbarComponent } from './components/searchbar.component';
import { ChatListComponent } from './components/chat-list.component';
import { ChatItemComponent } from './components/chat-item.component';
import { FloatButtonComponent } from './components/float-button.component';
import { ChatHeaderComponent } from './components/chat-header.component';
import { ChatMessagesComponent } from './components/chat-messages.component';
import { ChatInputComponent } from './components/chat-input.component';
import { ChatMessageComponent } from './components/chat-message.component';
import { NotFound } from './pages/notfound/notfound.component';
import { HttpRequestInterceptor } from './utils/http.interceptor';
import { StompService } from './ws/stomp.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChatComponent,
    ButtonComponent,
    InputComponent,
    AvatarComponent,
    SearchbarComponent,
    ChatListComponent,
    ChatItemComponent,
    FloatButtonComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatInputComponent,
    ChatMessageComponent,
    NotFound,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true,
      },
    ],
    provideRouter(routes, withComponentInputBinding()),
    StompService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
