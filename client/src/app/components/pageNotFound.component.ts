import { Component } from '@angular/core';

@Component({
  selector: 'page-not-found',
  template: `
    <div
      class="py-10 text-white w-full h-full flex flex-col items-center justify-between"
    >
      <div>
        <img class="w-[90%]" src="/assets/404.svg" alt="notfound" />
        <h1 class="text-light font-light uppercase text-justify">
          We're sorry, the page you were looking for does not exist. Please go
          back to the homepage!
        </h1>
      </div>
      <a class="w-full" routerLink="/">
        <app-button class="w-full" text="GO HOME"></app-button>
      </a>
    </div>
  `,
})
export class PageNotFound {}
