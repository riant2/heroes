import { HeroStatsModel } from './hero-stats.model';
import { statuses } from './hero-statuses.enum';
import { skillEvents } from './skill-events.enum';
import { skillTargets } from './skill-targets.enum';

export class HeroModel {
  __v: number = undefined;
  _id: string = undefined;
  name: string = undefined;
  faction: string = undefined;
  class: string = undefined;
  skills: any[] = [];
  stats: HeroStatsModel = {};
}

/* effectOverTime,

Groo
  Active
    enemies frontline
      damage 185%
      steal 35% armor * 2 rounds
    self
      heal 160% * 6 rounds
  Skill 1
    attacked
      enemies attacker
        reduce 2 rounds
          attack 15%
          crit 24%
  Skill 2
    stats
      hp 44%
      reduce damage 26%
  Skill 3
    attacked
      enemies attacker
        chance 100%
          attack 200%
          */

// tslint:disable-next-line:max-classes-per-file
export interface SkillEffect {
  chance?: number;
  damagePercent?: number;
  rounds?: number;
  status?: statuses | [statuses, number];
  statChange?: HeroStatsModel;
  statSteal?: HeroStatsModel;
  resurrect?: number;
}

// tslint:disable-next-line:max-classes-per-file
export interface HeroSkillModel {
  event: skillEvents | [skillEvents, number];
  targets: SkillTarget[];
}

export interface SkillEvent {
  event: skillEvents;
  target: SkillTarget;
}

// tslint:disable-next-line:max-classes-per-file
export interface SkillTarget {
  target: skillTargets | [skillTargets, number];
  effects: SkillEffect[];
}

export const groo: { [name: string]: HeroSkillModel } = {
  active: {
    event: skillEvents.active,
    targets: [
      {
        target: skillTargets.enemies | skillTargets.frontline,
        effects: [{ damagePercent: 185 }, { rounds: 2, statSteal: { armor: 35 } }],
      },
      { target: [skillTargets.self, 0], effects: [{ rounds: 6, damagePercent: -160 }] },
    ],
  },
  skill1: {
    event: skillEvents.defending,
    targets: [
      {
        target: skillTargets.attacker,
        effects: [{ rounds: 2, statChange: { attack: -15, crit: -25 } }],
      },
    ],
  },
  skill2: {
    event: skillEvents.passive,
    targets: [
      {
        target: skillTargets.self,
        effects: [{ statChange: { health: 44, reduceDamage: 26 } }],
      },
    ],
  },
  skill3: {
    event: skillEvents.defending,
    targets: [{ target: skillTargets.attacker, effects: [{ chance: 100, damagePercent: 200 }] }],
  },
};

export const michelle: { [name: string]: HeroSkillModel } = {
  active: {
    event: skillEvents.active,
    targets: [
      {
        target: [skillTargets.enemies | skillTargets.random, 4],
        effects: [{ damagePercent: 158 }, { chance: 40, rounds: 2, status: statuses.stun }],
      },
    ],
  },
  skill1: {
    event: skillEvents.passive,
    targets: [
      {
        target: skillTargets.self,
        effects: [{ statChange: { holyDamage: 60, attack: 30, speed: 40 } }],
      },
    ],
  },
  skill2: {
    event: skillEvents.death,
    targets: [
      {
        target: skillTargets.self,
        effects: [{ chance: 100, resurrect: 100 }],
      },
    ],
  },
  skill3: {
    event: skillEvents.passive,
    targets: [
      {
        target: skillTargets.self,
        effects: [{ statChange: { controlImmune: 100 } }],
      },
    ],
  },
};

/*
Michelle
  Active
    enemies random 4
      damage 158%
      40% chance to stun 2 rounds
    allies lowest-hp
      heal 400%
  Skill 1
    stats
      holy damage 60%
      attack 30%
      speed 40
  Skill 2
    death
      self
        chance 100 %
          resurrect hp 100%
  Skill 3
    stats
      control immune 100%
*/

export const malassa: { [name: string]: HeroSkillModel } = {
  active: {
    event: skillEvents.active,
    targets: [
      {
        target: [skillTargets.enemies | skillTargets.random, 4],
        effects: [
          { damagePercent: 125 },
          { rounds: 3, damagePercent: 55, status: statuses.poison, statChange: { speed: -30 } },
        ],
      },
    ],
  },
  skill1: {
    event: skillEvents.passive,
    targets: [
      {
        target: skillTargets.self,
        effects: [{ statChange: { crit: 40, attack: 30 } }],
      },
    ],
  },
  skill2: {
    event: skillEvents.attacking | skillEvents.crit,
    targets: [
      {
        target: skillTargets.defender,
        effects: [{ rounds: 2, damagePercent: 78, status: statuses.poison }],
      },
    ],
  },
  skill3: {
    event: skillEvents.passive,
    targets: [
      {
        target: skillTargets.self,
        effects: [{ statChange: { vsPoisoned: 60 } }],
      },
    ],
  },
};

/*
Malassa
  Active
    enemies
      random 4
        damage 125%
        poisoned damage 55% * 3 rounds
        reduce speed 30
  Skill 1
    stats
      crit 40%
      attack 30%
  Skill 2
    crit
      target
        poison 78% 2 rounds
  Skill 3
    passive
      damage vs poisoned
        60%

*/

export const rosa: { [name: string]: HeroSkillModel } = {
  active: {
    event: skillEvents.active,
    targets: [
      {
        target: skillTargets.enemies | skillTargets.all,
        effects: [
          { damagePercent: 95 },
          { rounds: 3, statChange: { attack: -15 } },
          { chance: 10, status: [statuses.criticalMark, 220] },
        ],
      },
      {
        target: skillTargets.allies | skillTargets.all,
        effects: [{ rounds: 3, statChange: { attack: 20 } }],
      },
    ],
  },
  skill1: {
    event: skillEvents.passive,
    targets: [
      {
        target: skillTargets.self,
        effects: [{ statChange: { health: 40, block: 35 } }],
      },
    ],
  },
  skill2: {
    event: skillEvents.attacking,
    targets: [
      {
        target: skillTargets.enemies | skillTargets.all,
        effects: [{ rounds: 3, statChange: { armor: -20 } }],
      },
    ],
  },
  skill3: {
    event: [skillEvents.hpBelow, 50],
    targets: [
      {
        target: skillTargets.allies | skillTargets.all,
        effects: [{ statChange: { reduceDamage: 16 } }],
      },
    ],
  },
};

/*

ROSA
  Active
    enemies all
      damage 95%
      reduce attack 15% 3 rounds
      chance 10%
        mark damage 220%
    allies all
      increase damage 20% 3 rounds
  Skill 1
    stats
      hp 40%
      block 35%
  Skill 2
    attacking
      enemies
        decrease
          armor 20% 3 rounds
  Skill 3
    hp below 50%
      allies
        increase
          reduce damage 16%

*/
