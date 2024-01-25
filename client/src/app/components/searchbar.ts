import { Component } from '@angular/core';

@Component({
  selector: 'searchbar',
  template: `
    <form
      class="flex items-center gap-3 bg-lightDark px-5 py-3 rounded-full border-2 border-transparent focus-within:border-grey transition-all duration-300"
    >
      <img src="/assets/search.svg" alt="search" class="w-6 opacity-60" />
      <input
        type="text"
        class="bg-transparent outline-none w-full placeholder:text-white/60 placeholder:text-sm"
        placeholder="Search"
      />
    </form>
  `,
})
export class SearchbarComponent {}
