import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { IColumn } from '../columns.interface';
import { HeroState } from '../hero-state.interface';
import { HeroModel } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list2',
  templateUrl: './hero-list2.component.html',
  styleUrls: ['./hero-list2.component.css'],
})
export class HeroList2Component implements OnInit {
  columns: Array<IColumn<HeroModel>> = [
    { header: x => 'name', item: x => x.name },
    { header: x => 'class', item: x => x.class },
    { header: x => 'faction', item: x => x.faction },
    { header: x => 'armor', item: x => x.stats.armor },
  ];
  heroesSubscription: Subscription;
  state: HeroState;

  constructor(private heroesService: HeroService, private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }

  ngOnInit() {
    this.heroesService.updateList();
    this.heroesSubscription = this.heroesService.state$
      .pipe(distinctUntilChanged())
      .subscribe(state => {
        console.log('HeroList2Component: new state');
        this.state = state;
        this.cdr.detectChanges();
      });
  }

  remove(id: string) {
    this.heroesService.tempDelete(id);
  }

  trackByHeroIdAndVersion = (index: number, id: string) => {
    const heroModel = this.state.idHash[id];
    return heroModel._id + heroModel.__v;
  };

  getValueFromObject(obj: {}, path: string): any {
    const parts = path.split('.');
    let value = obj;
    parts.forEach(part => {
      value = value[part];
    });
    return value;
  }
}
