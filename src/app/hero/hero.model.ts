export interface HeroModel {
  __v: number;
  _id: string;
  name: string;
  faction: string;
  class: string;
  skills: any[];
  stats: {
    attack: number;
    health: number;
    armor: number;
    speed: number;
    skillDamage: number;
    precision: number;
    block: number;
    crit: number;
    critDamage: number;
    armorBreak: number;
    controlImmune: number;
    reduceDamage: number;
    holyDamage: number;
  };
}
