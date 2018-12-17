import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  profile;

  constructor() {}

  ngOnInit() {}

  login = () => {
    console.log('login');
  };

  logout = () => {
    console.log('logout');
  };
}
