import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { HeroState } from '../hero-state.interface';
import { HeroModel } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit, OnDestroy {
  public heroState$: Observable<HeroState>;
  public heroState: HeroState;
  private heroStateSubscription: Subscription;
  public selectedHero: HeroModel = new HeroModel();

  constructor(protected heroService: HeroService) {}

  ngOnInit() {
    this.heroService.updateList();
    this.heroState$ = this.heroService.state$;

    this.heroStateSubscription = this.heroState$.subscribe(state => {
      this.heroState = state;
    });
  }

  ngOnDestroy() {
    if (this.heroStateSubscription) {
      this.heroStateSubscription.unsubscribe();
    }
  }

  delete = (heroId: string) => this.heroService.delete(heroId);
}
