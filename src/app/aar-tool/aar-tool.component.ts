import { Component, OnInit } from '@angular/core';
import { UserService, User, UserResult } from '../user.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-aar-tool',
  templateUrl: './aar-tool.component.html',
  styleUrls: ['./aar-tool.component.scss'],
  providers: [
    UserService
  ]
})
export class AarToolComponent implements OnInit {

  retrievedUsers: User[];
  myControl = new FormControl();
  supportedGames = ['Arma 3', 'Squad', 'Post Scriptum'];
  operationTypes = ['Coop', 'Tvt'];

  filteredOptions: Observable<User[]>;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getAll().subscribe(r => {this.retrievedUsers = r; console.log(r); this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.username),
        map(name => name ? this._filter(name) : this.retrievedUsers.slice())
      ); });
  }

  displayFn(user?: User): string | undefined {
    return user ? user.username : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.retrievedUsers.filter(option => option.username.toLowerCase().indexOf(filterValue) === 0);
  }

}
