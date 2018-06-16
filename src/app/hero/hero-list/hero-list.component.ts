import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.updateList();
    this.heroService.create({ name: 'Jahra', id: '' });
  }
}
