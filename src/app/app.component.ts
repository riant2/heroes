import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  profile;
  messages = [
    { from: 'from', subject: 'subject', content: 'content' },
    { from: 'from', subject: 'subject', content: 'content' },
    { from: 'from', subject: 'subject', content: 'content' },
  ];

  constructor(protected authService: AuthService) {}

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.updateUserProfile();
    }
  }

  login = () => {
    console.log('login');
    this.authService.login();
  };

  logout = () => {
    console.log('logout');
    this.authService.logout();
  };
}
