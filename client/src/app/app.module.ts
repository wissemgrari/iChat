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
import { ButtonComponent } from './components/button';
import { InputComponent } from './components/input';
import { AvatarComponent } from './components/avatar';
import { SearchbarComponent } from './components/searchbar';
import { ChatListComponent } from './components/chat-list';
import { ChatItemComponent } from './components/chat-item';
import { FloatButtonComponent } from './components/float-button';
import { ChatHeaderComponent } from './components/chat-header';
import { ChatMessagesComponent } from './components/chat-messages';
import { ChatInputComponent } from './components/chat-input';
import { ChatMessageComponent } from './components/chat-message';
import { NotFound } from './pages/notfound/notfound.component';
import { HttpRequestInterceptor } from './utils/http.interceptor';
import { RxStompService } from './rx/rx-stomp.service';
import { rxStompServiceFactory } from './rx/rx-stomp-service-factory';
import { DropDownComponent } from './components/dropdown';
import { Drawer } from './components/drawer/drawer';
import { ClickStopPropagation } from './directives/click-stop-propagation.directive';

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
    ClickStopPropagation
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
    provideRouter(routes, withComponentInputBinding())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
