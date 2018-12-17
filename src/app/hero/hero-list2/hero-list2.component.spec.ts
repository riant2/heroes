import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroList2Component } from './hero-list2.component';

describe('HeroList2Component', () => {
  let component: HeroList2Component;
  let fixture: ComponentFixture<HeroList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
