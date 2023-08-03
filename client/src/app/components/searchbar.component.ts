import { Component } from '@angular/core';

@Component({
  selector: 'searchbar',
  template: `
    <form class="flex items-center gap-3 bg-lightDark px-5 py-3 rounded-full">
      <img src="/assets/search.svg" alt="search" class="w-6" />
      <input
        type="text"
        class="bg-transparent outline-none w-full"
        placeholder="Search"
      />
    </form>
  `,
})
export class SearchbarComponent {}
