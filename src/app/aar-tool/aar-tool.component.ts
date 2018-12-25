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

  isOICPost: boolean;
  retrievedUsers: User[];
  myControl = new FormControl();
  supportedGames = ['Arma 3', 'Squad', 'Post Scriptum'];
  operationTypes = ['Coop', 'Tvt'];
  bbTemplate = `[CENTER][B]DEPARTMENT OF THE ARMY
  [B][B][B]S3 BATTLE STAFF
  [B]Headquarters
  7th Cavalry Regiment
  COMBAT AFTER ACTION REPORT[/B]
  [/B][/B][/B][/B][/CENTER]
  [B]Name of Combat Mission[/B]: Nightfall
  [B]Campaign of Combat Mission [/B](If applicable): N/A
  [Sp][/Sp]
  [B]Game[/B]: ARMA 3
  [B]Date of Combat Mission[/B]: 18DEC18
  [B]Time of Combat Mission (Zulu)[/B]: 0200 Zulu
  [B]Type of Combat Mission :[/B] Co-op
  [B]Mission OIC: [/B][URL='https://7cav.us/rosters/profile?uniqueid=123']Second Lieutenant Mike LaCombe         [/URL]
  [B]Mission Controller: [/B][URL='https://7cav.us/rosters/profile?uniqueid=123'] Second Lieutenant Mike LaCombe         [/URL]
  [Sp][/Sp]
  [Sp][/Sp]
  [B]Number of Attendees (Reserved for AAR Clerk): [/B]
  [Sp][/Sp]
  [B]7th Cavalry Personnel Involved in Action (Must be copy/pasted from the [URL='https://7cav.us/rosters/']Combat Roster[/URL])[/B]:
  [URL='https://7cav.us/rosters/profile?uniqueid=312']Captain Ryu Mitsuma[/URL]
  [Sp][/Sp]
  [B]If your name is not listed, or if you have medal recommendations, contact [/B][URL='https://7cav.us/rosters/profile?uniqueid=123']Second Lieutenant Mike LaCombe[/URL]
`;
  htmlTemplate = ``;

  // OIC Post vars
  fieldMissionName = '';
  fieldMissionCampaignName = '';
  fieldMissionCampaignNumber = '';
  fieldMissionGame = '';
  fieldMissionDate = '';
  fieldMissionTime = '';
  fieldMissionType = '';
  fieldMissionOIC = '';
  fieldMissionController = '';

  // Reply post vars
  fieldElementCallsign = '';
  fieldElementLeader = '';

  // Shared
  fieldMissionPersonnel = '';

  filteredOptions: Observable<User[]>;

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getAll().subscribe(r => {this.retrievedUsers = r; this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.username),
        map(name => name ? this._filter(name) : this.retrievedUsers.slice())
      );
    });
  }

  displayFn(user?: User): string | undefined {
    return user ? user.username : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.retrievedUsers.filter(option => option.username.toLowerCase().indexOf(filterValue) === 0);
  }
}
