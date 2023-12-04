import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  user!: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe((params) => {
      this.user = this.userService.getUserById(parseInt(params['id']))!;
    });
  }
}
