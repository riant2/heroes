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
  public heroForm: FormGroup;

  public factions: string[] = ['shadow', 'abyss', 'fortress', 'forest', 'light', 'dark'];
  public classes: string[] = ['warrior', 'mage', 'priest', 'ranger', 'assassin'];

  constructor(private heroService: HeroService, private fb: FormBuilder) {
    this.heroForm = fb.group({
      __v: 0,
      _id: '',
      name: ['', Validators.required],
      faction: '',
      class: '',
      skills: fb.array([]),
      stats: fb.group({
        attack: [0, Validators.min(10)],
        health: 0,
        armor: 0,
        speed: 0,
        skillDamage: 0,
        precision: 0,
        block: 0,
        crit: 0,
        critDamage: 0,
        armorBreak: 0,
        controlImmune: 0,
        reduceDamage: 0,
        holyDamage: 0,
      }),
    });
  }

  ngOnInit() {
    this.heroService.updateList();
    this.heroes$ = this.heroService.state$;
  }

  submit = () => {
    const id = this.heroForm.get('_id').value;
    if (id) {
      this.heroService.update(this.heroForm.value);
      this.heroForm.reset();
    } else {
      this.heroService.create(this.heroForm.value);
      this.heroForm.reset();
    }
  };

  select = (hero: HeroModel) =>
    this.heroForm.setValue({ ...hero, faction: hero.faction || '', class: hero.class || '' });

  delete = (heroId: string) => this.heroService.delete(heroId);
}
