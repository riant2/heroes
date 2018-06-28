import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroModel } from '../hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit, OnChanges {
  @Input() hero: HeroModel = new HeroModel();
  heroForm: FormGroup;
  factions: string[] = ['shadow', 'abyss', 'fortress', 'forest', 'light', 'dark'];
  classes: string[] = ['warrior', 'mage', 'priest', 'ranger', 'assassin'];
  skillTypes: string[] = ['dot', 'stats', 'roundIncrease', 'allyDeath', 'enemyDeath'];

  constructor(private fb: FormBuilder, protected heroService: HeroService) {
    this.heroForm = fb.group({
      __v: 0,
      _id: '',
      name: ['', Validators.required],
      faction: '',
      class: '',
      skills: fb.group({
        active: {},
        second: {},
        third: {},
        fourth: {},
      }),
      stats: fb.group({
        level: 0,
        power: 0,
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
    console.log(this.hero);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hero) {
      this.heroForm.patchValue(this.hero);
    }
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

  reset = () => (this.hero = new HeroModel());
}
