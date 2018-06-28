export interface HeroStatsModel {
  level?: number;
  power?: number;
  attack?: number;
  health?: number;
  armor?: number;
  speed?: number;
  skillDamage?: number;
  precision?: number;
  block?: number;
  crit?: number;
  critDamage?: number;
  armorBreak?: number;
  controlImmune?: number;
  reduceDamage?: number;
  holyDamage?: number;

  vsPoisoned?: number;
  vsStunned?: number;
  vsFrozen?: number;

  vsWarriors?: number;
  vsRangers?: number;
  vsPriests?: number;
  vsAssasins?: number;
  vsMages?: number;
}
