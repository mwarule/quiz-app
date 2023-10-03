import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppLayoutService } from '../../services/app-layout.service';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { ADMIN_MENU, USER_MENU } from '../../../core/utils/constants';

@Component({
    selector: 'app-menu',
    templateUrl: './app-menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: AppLayoutService, private authService: AuthenticationService) { }

    ngOnInit() {
        if(this.authService.isAdmin) {
            this.model = ADMIN_MENU;
        } else {
            this.model = USER_MENU;
        }

    }
}