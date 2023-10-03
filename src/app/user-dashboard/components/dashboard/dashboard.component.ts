import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { first, take } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
   this.checkUserProflileStatus();
  }

  checkUserProflileStatus() {
    this.userService.user$
    .subscribe(user => {
      if(user) {
        
      }
    })
  }
}
