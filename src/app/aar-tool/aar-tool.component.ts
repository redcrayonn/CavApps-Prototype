import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-aar-tool',
  templateUrl: './aar-tool.component.html',
  styleUrls: ['./aar-tool.component.scss'],
  providers: [
    UserService
  ]
})
export class AarToolComponent implements OnInit {

  retrievedUsers: any;
  constructor(private user: UserService) { }

  ngOnInit() {
    // Retrieve users from API.
    this.retrievedUsers = this.user.getAll();
  }

}
