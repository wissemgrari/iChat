import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent {

  private id!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
    });
  }

  ngOnInit(): void {

    // TODO: fetch messages
    

  }


}
