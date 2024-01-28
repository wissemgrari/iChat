import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  RouterModule,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { routes } from './routes';

import { AppComponent } from './app.component';
import { AvatarComponent } from './components/avatar';
import { ButtonComponent } from './components/button';
import { ChatHeaderComponent } from './components/chat-header';
import { ChatInputComponent } from './components/chat-input';
import { ChatItemComponent } from './components/chat-item';
import { ChatListComponent } from './components/chat-list';
import { ChatMessageComponent } from './components/chat-message';
import { ChatMessagesComponent } from './components/chat-messages';
import { Drawer } from './components/drawer/drawer';
import { DropDownComponent } from './components/dropdown';
import { FloatButtonComponent } from './components/float-button';
import { InputComponent } from './components/input';
import { SearchbarComponent } from './components/searchbar';
import { ClickStopPropagation } from './directives/click-stop-propagation.directive';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFound } from './pages/notfound/notfound.component';
import { rxStompServiceFactory } from './rx/rx-stomp-service-factory';
import { RxStompService } from './rx/rx-stomp.service';
import { HttpRequestInterceptor } from './utils/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    ButtonComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ChatListComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatItemComponent,
    ChatComponent,
    Drawer,
    DropDownComponent,
    FloatButtonComponent,
    HomeComponent,
    InputComponent,
    LoginComponent,
    NotFound,
    SearchbarComponent,
    ClickStopPropagation,
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
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
    provideRouter(routes, withComponentInputBinding()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
