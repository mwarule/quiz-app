import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppLayoutService } from '../../services/app-layout.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { UserService } from '../../../core/services/user.service';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss']
})
export class AppTopbarComponent implements OnInit {
  user$!: Observable<User | null>
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: AppLayoutService,
    public authService: AuthenticationService,
    private userService: UserService,
    private auth: Auth) {
      this.auth.onAuthStateChanged(auth => {
        this.user$ = this.userService.user$;
      })
     }

  ngOnInit(): void {
  }
}
