import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroState } from '../hero-state.interface';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  public heroes$: Observable<HeroState>;
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.updateList();
    this.heroes$ = this.heroService.state$;
  }
}
