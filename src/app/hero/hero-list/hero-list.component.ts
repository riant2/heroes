import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeroState } from '../hero-state.interface';
import { HeroModel } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  public heroes$: Observable<HeroState>;
  public selectedHero: HeroModel = new HeroModel();

  constructor(protected heroService: HeroService, private fb: FormBuilder) {}

  ngOnInit() {
    this.heroService.updateList();
    this.heroes$ = this.heroService.state$;
  }

  delete = (heroId: string) => this.heroService.delete(heroId);
}
