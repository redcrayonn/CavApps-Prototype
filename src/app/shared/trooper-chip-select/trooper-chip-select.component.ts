import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { User, UserService } from '../../user.service';

@Component({
  selector: 'app-trooper-chip-select',
  templateUrl: './trooper-chip-select.component.html',
  styleUrls: ['./trooper-chip-select.component.scss']
})
export class TrooperChipSelectComponent implements OnInit {

  @Input() placeholder: string;
  @Input() singleSelection: Boolean = false;
  @Output() optionSelected = new EventEmitter();
  @Output() optionRemoved = new EventEmitter();

  // TODO: perhaps instead of calling multiple optionselected / removed events just add an ngmodel input like standard angular components.

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUsers: Observable<User[]>;
  selectedUsers: User[] = [];
  allUsers: User[] = [];


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private userService: UserService) {
    // this.filteredUsers = this.userCtrl.valueChanges.pipe(
    //     startWith(null),
    //     map((user: User | null) => user ? this._filter(user) : this.users));
    this.userService.getAll().subscribe(r => {this.allUsers = r; });

    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((username: string | null) => username ? this._filter(username) : this.allUsers));
  }

  ngOnInit() {
  }

  // add(event: MatChipInputEvent): void {
  //   // Add fruit only when MatAutocomplete is not open
  //   // To make sure this does not conflict with OptionSelected Event
  //   if (!this.matAutocomplete.isOpen) {
  //     const input = event.input;
  //     const value = event.value;

  //     // Add our fruit
  //     this.users.push(this.Users.find(c => c.user_id == ));

  //     // Reset the input value
  //     if (input) {
  //       input.value = '';
  //     }

  //     this.userCtrl.setValue(null);
  //   }
  // }

  remove(user: User): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
      this.optionRemoved.emit(user);
    }
  }

  removeAll(): void {
    this.selectedUsers = [];
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (event.option.value) {
      if (this.singleSelection) {
        // clear list
        this.removeAll();
        // add new user
        this.selectedUsers.push(event.option.value);
      } else {
        this.selectedUsers.push(event.option.value);
      }
      // wtf?
      this.fruitInput.nativeElement.value = '';
      // clear input
      this.userCtrl.setValue(null);
      // emit selected event
      this.optionSelected.emit(event.option.value);
    }
  }

  private _filter(filterValue: string): User[] {
    return this.allUsers.filter(user => !this.selectedUsers.find(x => x.user_id === user.user_id) && user.username.toLowerCase().indexOf(filterValue) === 0);
  }
}
