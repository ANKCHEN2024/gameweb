import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const guidesRoot = join(__dirname, '..', 'src', 'content', 'guides');

const newGames = [
  {
    slug: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    guides: [
      {
        file: 'beginner-guide-first-act.mdx',
        title: "Baldur's Gate 3 Beginner Guide: First Act Survival",
        description:
          "Essential Baldur's Gate 3 beginner tips for Act 1 — combat basics, resting, exploration, and mistakes to avoid on your first playthrough.",
        tags: ['beginner', 'act 1', 'combat'],
        faq: [
          {
            question: 'What difficulty should I pick for my first Baldur\'s Gate 3 run?',
            answer: 'Balanced is the sweet spot for first-timers. Tactician is punishing until you understand action economy and positioning.',
          },
          {
            question: 'How often should I long rest in Act 1?',
            answer: 'Rest when spell slots are low or HP is critical. Do not hoard rests — story events can advance if you rest too often in certain areas.',
          },
        ],
        body: `Baldur's Gate 3 rewards preparation more than reflexes. Your first act sets habits for the entire campaign.

## Core combat rules

- **High ground** adds attack advantage — climb whenever possible
- **Bonus actions** matter as much as main actions — use them every turn
- **Surfaces** (fire, water, grease) combo with spells for huge damage

## Party setup for Act 1

| Role | Recommendation |
| --- | --- |
| Frontline | Fighter, Barbarian, or Paladin |
| Control | Wizard or Sorcerer |
| Support | Cleric or Druid |
| Face | Bard or Warlock |

## Exploration priorities

1. Clear the Ravaged Beach and find your first companions
2. Visit every map icon before pushing main quests
3. Loot everything — components fund early gear upgrades
4. Talk to every NPC — many quests hide in dialogue

## Common beginner mistakes

- Ignoring stealth for surprise rounds
- Skipping short rests between fights
- Selling unique items before identifying them
- Splitting the party too far on the overworld

## Bottom line

Learn action economy, use high ground, and explore Act 1 thoroughly before rushing the grove. Your build choices matter less than tactical fundamentals early.`,
      },
      {
        file: 'best-class-first-playthrough.mdx',
        title: "Best Class for Your First Baldur's Gate 3 Playthrough",
        description:
          "The best Baldur's Gate 3 class and subclass for beginners — Fighter, Paladin, Cleric, and why they teach core systems safely.",
        tags: ['class', 'beginner', 'build'],
        faq: [
          {
            question: 'Is Fighter good for beginners in BG3?',
            answer: 'Yes. Fighter has simple action economy, strong weapon attacks, and Action Surge for clutch turns without complex spell lists.',
          },
        ],
        body: `Your first class should teach BG3 systems without overwhelming spell management.

## Top picks for first playthrough

| Class | Subclass | Why |
| --- | --- | --- |
| Fighter | Battle Master | Reliable damage + maneuvers |
| Paladin | Oath of Devotion | Self-heals + smite burst |
| Cleric | Life Domain | Healing teaches party management |
| Barbarian | Berserker | Simple rage-and-hit gameplay |

## Classes to delay

- **Wizard** — huge spell list, fragile early
- **Sorcerer** — metamagic optimization required
- **Bard** — support-heavy, less forgiving solo

## Multiclass note

Skip multiclass on your first run. Single-class levels 1–5 are easier to understand.

## Bottom line

Fighter or Paladin for martial simplicity, Cleric if you want to learn support. Save Wizard for run two.`,
      },
      {
        file: 'best-companions-act-1.mdx',
        title: "Best Companions to Recruit Early in Baldur's Gate 3",
        description:
          "Which Baldur's Gate 3 companions to recruit first in Act 1 — party synergy, approval tips, and who fills each role.",
        tags: ['companions', 'party', 'act 1'],
        faq: [
          {
            question: 'How many companions can I have in BG3?',
            answer: 'Four active party members plus your custom character. You can recruit all companions but only travel with four at a time.',
          },
        ],
        body: `Companions define your party balance. Recruit early to level together and unlock personal quests.

## Must-recruit Act 1 companions

| Companion | Role | Synergy |
| --- | --- | --- |
| Shadowheart | Cleric healer | Every party needs healing |
| Lae'zel | Fighter frontline | Strong early damage |
| Astarion | Rogue scout | Locks, traps, sneak attacks |
| Gale | Wizard control | AoE and crowd control |

## Approval basics

- Respect companion values in dialogue
- Do not force romance early — focus on trust
- Personal quest items appear on the map — prioritize them

## Party templates

**Balanced:** Custom PC + Shadowheart + Lae'zel + Astarion

**Magic heavy:** Custom PC + Gale + Shadowheart + Wyll

## Bottom line

Recruit Shadowheart and Lae'zel first for sustain and damage. Add Astarion for utility before harder Act 1 fights.`,
      },
    ],
  },
  {
    slug: 'elden-ring',
    title: 'Elden Ring',
    guides: [
      {
        file: 'beginner-guide-open-world.mdx',
        title: 'Elden Ring Beginner Guide: Open World Basics',
        description:
          'Elden Ring beginner guide for 2026 — open world exploration, Sites of Grace, leveling, and how to avoid early frustration.',
        tags: ['beginner', 'open world', 'exploration'],
        faq: [
          {
            question: 'Where should I go first in Elden Ring?',
            answer: 'Limgrave south of the Gatefront Ruins is the intended starter zone. Avoid Stormveil Castle until you are comfortable with combat.',
          },
        ],
        body: `Elden Ring lets you go anywhere — that freedom kills beginners who wander into endgame zones.

## Safe early route

1. Chapel of Anticipation skip → Limgrave
2. Clear Gatefront Ruins and Church of Elleh
3. Beat Margit only when weapon is +3 or higher
4. Explore Weeping Peninsula before Stormveil

## Key systems

| System | Tip |
| --- | --- |
| Flask charges | Upgrade at Sites of Grace with Golden Seeds |
| Weapon upgrades | Smithing stones at Roundtable Hold |
| Runes | Level Vigor to 20–30 first |
| Spirit ashes | Upgrade at Roundtable — huge power spike |

## Bottom line

Stay in Limgrave and Weeping Peninsula until you can comfortably beat field bosses. Vigor first, damage second.`,
      },
      {
        file: 'best-starter-weapons.mdx',
        title: 'Elden Ring Best Starter Weapons for New Players',
        description:
          'Best early weapons in Elden Ring — Moonveil, Bloodhound Fang, Claymore, and where to find them without late-game spoilers.',
        tags: ['weapons', 'early game', 'build'],
        faq: [
          {
            question: 'What is the best early weapon in Elden Ring?',
            answer: 'Bloodhound\'s Fang and Claymore are excellent early finds. Moonveil is strong if you invest in Intelligence.',
          },
        ],
        body: `Weapon choice in Elden Ring depends on stat investment. Commit to one scaling path.

## Best early weapons

| Weapon | Scaling | Location hint |
| --- | --- | --- |
| Bloodhound's Fang | Dex | Forlorn Hound Evergaol |
| Claymore | Str/Dex | Caravan in Limgrave |
| Uchigatana | Dex/Arc | Deathtouched Catacombs entrance |
| Moonveil | Dex/Int | Caelid, Gael Tunnel |

## Upgrade priority

- Normal stones to +6 before exploring Caelid
- Find a weapon with good moveset feel — moveset beats raw AR early

## Bottom line

Grab Claymore or Bloodhound's Fang in Limgrave. Upgrade to +6 before Margit for a smooth first boss.`,
      },
      {
        file: 'best-ashes-of-war-early.mdx',
        title: 'Best Ashes of War for Early Elden Ring',
        description:
          'Top Elden Ring Ashes of War for early game — Bloodhound Step, Lion\'s Claw, and how to equip them at Sites of Grace.',
        tags: ['ashes of war', 'skills', 'combat'],
        faq: [
          {
            question: 'How do I equip Ashes of War in Elden Ring?',
            answer: 'Rest at a Site of Grace, choose Ashes of War, and apply to a weapon. You can swap skills without losing the ash.',
          },
        ],
        body: `Ashes of War transform weapons with new skills and scaling options.

## Best early ashes

| Ash | Effect | Best on |
| --- | --- | --- |
| Bloodhound Step | Quick dodge | Any melee weapon |
| Lion's Claw | Heavy stagger | Greatswords |
| Hoarfrost Stomp | Frost AoE | Halberds, greatswords |
| Determination | Damage buff | Boss fights |

## Where to find them

- Bloodhound Step: Forlorn Hound Evergaol reward area
- Lion's Claw: Fort Haight chest
- Hoarfrost Stomp: Teardrop Scarab in Limgrave

## Bottom line

Bloodhound Step is the best universal mobility tool. Lion's Claw for stagger-heavy greatsword builds.`,
      },
    ],
  },
  {
    slug: 'palworld',
    title: 'Palworld',
    guides: [
      {
        file: 'beginner-guide-first-day.mdx',
        title: 'Palworld Beginner Guide: Your First Day',
        description:
          'Palworld beginner guide — catching your first Pals, base setup, hunger management, and the first 5 levels.',
        tags: ['beginner', 'base', 'pals'],
        faq: [
          {
            question: 'What Pal should I catch first in Palworld?',
            answer: 'Lamball and Cattiva are easy early catches. Look for Pals with Handiwork or Kindling work suitability for your base.',
          },
        ],
        body: `Your first day in Palworld sets your production loop. Catch workers before exploring far.

## First-hour checklist

1. Craft Primitive Workbench
2. Build Palbox and basic base
3. Catch 3–5 Pals with work skills
4. Unlock Technology for Stone Axe and Wooden Club

## Essential work types early

| Work | Why |
| --- | --- |
| Kindling | Cooking and smelting |
| Handiwork | Crafting speed |
| Planting | Food sustain |
| Transporting | Base efficiency |

## Bottom line

Catch Pals with complementary work skills before grinding levels. A working base beats a high-level solo explorer.`,
      },
      {
        file: 'best-pals-early-game.mdx',
        title: 'Palworld Best Pals for Early Game',
        description:
          'Best early Pals in Palworld for combat, base work, and traversal — tier list for the first 15 levels.',
        tags: ['pals', 'tier list', 'early game'],
        faq: [
          {
            question: 'What are the best work Pals in early Palworld?',
            answer: 'Cattiva, Lamball, and Pengullet cover basic crafting and transport. Eikthyrdeer helps with logging early.',
          },
        ],
        body: `Early Pal picks should cover combat, base work, and eventually mounts.

## Best early Pals

| Pal | Role | Work skills |
| --- | --- | --- |
| Cattiva | Starter fighter | Handiwork |
| Lamball | Tanky early | Transporting |
| Pengullet | Ranged support | Handiwork, Watering |
| Eikthyrdeer | Mount | Logging |
| Foxparks | Kindling | Kindling |

## Combat vs work balance

Keep at least 2 combat Pals in party and 3–4 workers at base. Swap workers as you unlock better suits.

## Bottom line

Cattiva + Lamball for starters, rush Eikthyrdeer for mount mobility, add Foxparks for base kindling.`,
      },
      {
        file: 'base-building-tips.mdx',
        title: 'Palworld Base Building Tips for Efficient Bases',
        description:
          'Palworld base layout tips — Palbox placement, work stations, food storage, and how to avoid base Pal pathing issues.',
        tags: ['base', 'building', 'tips'],
        faq: [
          {
            question: 'How many Pals can work at a base in Palworld?',
            answer: 'Base capacity starts at 5 Pals and increases with Palbox upgrades and certain technologies.',
          },
        ],
        body: `A compact base beats a sprawling one. Pals path poorly over long distances.

## Layout principles

- Place **Palbox** centrally
- Cluster workbenches within 10 meters
- Dedicated **feed box** and **chest** near beds
- Flat terrain reduces stuck Pals

## Production chain order

1. Logging and mining stations
2. Crusher and furnace
3. Production benches (weapons, spheres)
4. Ranch for passive resources

## Bottom line

Build tight, flat, and central. Upgrade Palbox early to add more workers before expanding territory.`,
      },
    ],
  },
  {
    slug: 'helldivers-2',
    title: 'Helldivers 2',
    guides: [
      {
        file: 'beginner-guide-survival.mdx',
        title: 'Helldivers 2 Beginner Guide: Survive Your First Missions',
        description:
          'Helldivers 2 beginner tips — stratagem calls, friendly fire, armor types, and mission flow for new Helldivers.',
        tags: ['beginner', 'co-op', 'survival'],
        faq: [
          {
            question: 'How do I avoid friendly fire in Helldivers 2?',
            answer: 'Check fire lanes before shooting, use stim for emergencies, and call orbital stratagems away from teammates.',
          },
        ],
        body: `Helldivers 2 punishes chaos. Communication and stratagem discipline win missions.

## Mission basics

1. Scan objectives on drop
2. Call **Eagle** or **Orbital** stratagems before engaging hordes
3. Extract together — do not leave stragglers

## Armor quick pick

| Type | Best for |
| --- | --- |
| Light | Speed runners, experienced players |
| Medium | Balanced — best for beginners |
| Heavy | Frontline tank with team support |

## Bottom line

Play Medium armor, learn 3 stratagems perfectly, and always watch the sky for incoming ordnance — yours and the enemy's.`,
      },
      {
        file: 'best-weapons-loadouts.mdx',
        title: 'Helldivers 2 Best Weapons and Loadouts for Beginners',
        description:
          'Best Helldivers 2 weapons and loadouts in 2026 — Primary picks, grenades, and stratagem pairings for low-level play.',
        tags: ['weapons', 'loadout', 'meta'],
        faq: [
          {
            question: 'What is the best primary weapon for beginners in Helldivers 2?',
            answer: 'Liberator variants and Breaker shotgun are forgiving. Liberator Penetrator handles armored targets well.',
          },
        ],
        body: `Weapon choice should match your stratagems and team role.

## Beginner-friendly primaries

| Weapon | Strength |
| --- | --- |
| Liberator | Reliable all-rounder |
| Breaker | Close horde clear |
| Liberator Penetrator | Armored targets |
| Diligence | Precision at range |

## Sample loadout

- Primary: Liberator Penetrator
- Secondary: Redeemer pistol
- Grenade: Frag or G-7 Pineapple
- Stratagems: Orbital 500kg, Resupply, Eagle Strafing

## Bottom line

Liberator Penetrator + Resupply + heavy ordnance stratagem covers 80% of missions for new players.`,
      },
      {
        file: 'best-stratagem-combos.mdx',
        title: 'Helldivers 2 Best Stratagem Combos',
        description:
          'Top Helldivers 2 stratagem combinations for bug, bot, and Illuminate missions — team synergy and cooldown management.',
        tags: ['stratagems', 'team', 'combos'],
        faq: [
          {
            question: 'What stratagems should every Helldiver bring?',
            answer: 'Resupply is nearly mandatory. Add one anti-armor orbital and one crowd-control tool for your faction.',
          },
        ],
        body: `Stratagem combos define mission success. Coordinate cooldowns with your squad.

## Universal combos

| Combo | Use case |
| --- | --- |
| Resupply + 500kg Orbital | Sustain + boss kills |
| Eagle Strafing + Cluster | Horde clear |
| Railgun + Laser Cannon | Bot missions |
| Quasar + Arc Thrower | Illuminate shields |

## Team rule

One player brings Resupply, one brings anti-armor, one brings CC. Fourth flexes mission-specific tools.

## Bottom line

Always pack Resupply. Pair with faction-specific armor killers and one horde-clear tool.`,
      },
    ],
  },
  {
    slug: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    guides: [
      {
        file: 'beginner-guide-combat.mdx',
        title: 'Black Myth: Wukong Beginner Guide: Combat Fundamentals',
        description:
          'Black Myth: Wukong beginner combat guide — staff stances, dodge timing, spirit skills, and cultivation basics.',
        tags: ['beginner', 'combat', 'stances'],
        faq: [
          {
            question: 'How many stances are in Black Myth: Wukong?',
            answer: 'Three staff stances — Smash, Pillar, and Thrust — each with unique combos and unlock trees.',
          },
        ],
        body: `Wukong's combat rewards stance switching and perfect dodges. Learn one stance deeply before branching.

## Stance overview

| Stance | Style |
| --- | --- |
| Smash | Heavy hits, high stagger |
| Pillar | Defensive, reach |
| Thrust | Fast combos, mobility |

## Core tips

- Perfect dodge builds focus for spirit skills
- Invest in stamina upgrades early
- Explore side paths for cultivation materials

## Bottom line

Master Smash stance first for stagger, add Thrust for faster bosses. Perfect dodge timing is your best defense.`,
      },
      {
        file: 'best-spells-transformations.mdx',
        title: 'Black Myth: Wukong Best Spells and Transformations',
        description:
          'Best spells and transformations in Black Myth: Wukong — early picks, mana management, and boss fight usage.',
        tags: ['spells', 'transformations', 'build'],
        faq: [
          {
            question: 'When should I use transformations in Black Myth: Wukong?',
            answer: 'Save transformations for boss phase changes or when you need burst damage during stagger windows.',
          },
        ],
        body: `Spells and transformations turn difficult fights into manageable patterns.

## Priority unlocks

- **Immobilize** — opens burst windows
- **Cloud Step** — escape and reposition
- **Rock Solid** — parry alternative for aggressive play

## Transformation tips

- Each form has separate health — use as extra HP bar
- Upgrade transformation spirits at shrines
- Match transformation element to boss weaknesses when possible

## Bottom line

Immobilize + heavy combo is the core loop. Transformations are your emergency trump card — not spam.`,
      },
      {
        file: 'early-boss-tips.mdx',
        title: 'Black Myth: Wukong Early Boss Tips',
        description:
          'How to beat early bosses in Black Myth: Wukong — pattern recognition, consumables, and when to back off and farm.',
        tags: ['boss', 'tips', 'early game'],
        faq: [
          {
            question: 'Should I farm levels before bosses in Black Myth: Wukong?',
            answer: 'If a boss kills you in 2–3 hits, farm nearby enemies for Will and craft better gear before retrying.',
          },
        ],
        body: `Early bosses teach pattern discipline. Rushing leads to frustration.

## General boss rules

1. Learn first phase only — die intentionally to observe
2. Use Immobilize after dodge-learning phase
3. Stock healing gourds and antidotes
4. Upgrade armor at shrines between attempts

## When to farm

- Boss combo one-shots you → upgrade HP
- Fight exceeds 5 minutes → upgrade damage
- Cannot dodge reliably → practice in nearby encounters

## Bottom line

Treat each boss as a pattern exam. One phase at a time, upgrade between attempts, never button-mash.`,
      },
    ],
  },
  {
    slug: 'hades-ii',
    title: 'Hades II',
    guides: [
      {
        file: 'beginner-guide-first-runs.mdx',
        title: 'Hades II Beginner Guide: First Runs',
        description:
          'Hades II beginner guide for early access — Melinoë basics, weapon selection, and what to unlock between runs.',
        tags: ['beginner', 'roguelike', 'runs'],
        faq: [
          {
            question: 'Which weapon should I start with in Hades II?',
            answer: 'The Witch\'s Staff is the default and most balanced. Daggers are fast for learning dodge patterns.',
          },
        ],
        body: `Hades II expands roguelike loops with crafting between runs. Expect to die — progression is permanent.

## First-run priorities

1. Learn dodge and sprint invulnerability frames
2. Unlock basic incantations at the Crossroads
3. Experiment with one weapon for 5 runs minimum
4. Gather resources even on failed runs

## Between-run upgrades

| System | Priority |
| --- | --- |
| Selene hexes | High — run-defining |
| Olympian boons | Per-run power |
| Tool upgrades | Unlock gathering efficiency |
| Keepsake slots | Boss-specific bonuses |

## Bottom line

Staff or Daggers for first weapon mastery. Never skip resource gathering — crafting unlocks are permanent power.`,
      },
      {
        file: 'best-weapon-aspects.mdx',
        title: 'Hades II Best Weapon Aspects for Beginners',
        description:
          'Best Hades II weapon aspects to unlock early — Staff, Daggers, and Axes aspects that simplify early escape attempts.',
        tags: ['weapons', 'aspects', 'build'],
        faq: [
          {
            question: 'How do I unlock weapon aspects in Hades II?',
            answer: 'Invest resources at the weapon rack in the Crossroads. Each aspect changes the weapon moveset and boon synergies.',
          },
        ],
        body: `Aspects reshape weapons more than stat upgrades. Pick aspects that match your boon luck.

## Beginner-friendly aspects

| Weapon | Aspect tip |
| --- | --- |
| Staff | Default aspect is balanced |
| Daggers | Seek dash-focused aspects |
| Axe | Slower — unlock after fundamentals |
| Skull | Ranged option for safe learning |

## Investment order

1. Upgrade default aspect on main weapon
2. Unlock second aspect for variety
3. Save rare resources for favorite aspect rank-ups

## Bottom line

Max your main weapon's default aspect before spreading resources. Daggers second for mobility learning.`,
      },
      {
        file: 'boon-synergies-guide.mdx',
        title: 'Hades II Boon Synergies Guide',
        description:
          'Hades II boon synergy basics — Olympian pairings, hex combos, and elements that stack for huge damage.',
        tags: ['boons', 'synergy', 'build'],
        faq: [
          {
            question: 'Do boon elements stack in Hades II?',
            answer: 'Yes. Freeze, Hitch, and Wound effects combine with god-specific duo boons when you meet unlock conditions.',
          },
        ],
        body: `Boon synergy separates short runs from deep clears. Commit to 1–2 gods per run.

## Strong early pairings

| Gods | Synergy |
| --- | --- |
| Hera + Apollo | Hitch + expose effects |
| Aphrodite + Ares | Weak + doom pressure |
| Demeter + Zeus | Freeze + chain lightning |

## Rules

- Take boons that **amplify** your weapon, not random power
- Duo boons need specific prerequisites — plan keepsakes
- Hexes from Selene stack independently of Olympians

## Bottom line

Pick two gods that share status effects. Check boon descriptions for duo hints before skipping offers.`,
      },
    ],
  },
  {
    slug: 'stardew-valley',
    title: 'Stardew Valley',
    guides: [
      {
        file: 'beginner-guide-first-year.mdx',
        title: 'Stardew Valley Beginner Guide: First Year Plan',
        description:
          'Stardew Valley first year guide — crops, energy management, community center vs Joja, and seasonal priorities.',
        tags: ['beginner', 'first year', 'farming'],
        faq: [
          {
            question: 'What crops should I plant in Spring Stardew Valley?',
            answer: 'Potatoes and strawberries (Egg Festival) are strong Spring picks. Blueberries dominate Summer.',
          },
        ],
        body: `Year one sets your farm economy. Do not over-invest in animals before crops stabilize.

## Season-by-season plan

| Season | Focus |
| --- | --- |
| Spring | Potatoes, upgrade watering can |
| Summer | Blueberries, mine levels 40–80 |
| Fall | Cranberries, finish museum bundles |
| Winter | Mine, fishing, skill leveling |

## Energy management

- Eat foraged food early
- Upgrade tools on rain days
- Build sprinklers by mid-Summer

## Bottom line

Crops first, animals second. Upgrade watering can Spring 25–27, rush mine levels in Summer evenings.`,
      },
      {
        file: 'best-crops-by-season.mdx',
        title: 'Stardew Valley Best Crops by Season',
        description:
          'Most profitable Stardew Valley crops per season — Spring, Summer, Fall gold-per-day breakdown for new farmers.',
        tags: ['crops', 'profit', 'farming'],
        faq: [
          {
            question: 'What is the most profitable crop in Stardew Valley?',
            answer: 'Starfruit in Summer with greenhouse access. For year one: Blueberries (Summer) and Cranberries (Fall) are top picks.',
          },
        ],
        body: `Profit per day matters more than sell price. Multi-harvest crops win long-term.

## Best crops table

| Season | Crop | Why |
| --- | --- | --- |
| Spring | Strawberries | Multi-harvest after festival |
| Summer | Blueberries | Repeat harvests |
| Fall | Cranberries | Highest fall ROI |
| Winter | None outdoor | Greenhouse or animals |

## Calculation tip

Gold per day = (total harvest gold - seed cost) / days to mature

## Bottom line

Blueberries and Cranberries carry year one. Save for Starfruit when greenhouse unlocks.`,
      },
      {
        file: 'money-making-early.mdx',
        title: 'Stardew Valley Early Money Making Tips',
        description:
          'How to make money fast early in Stardew Valley — fishing, foraging, mining, and daily routine for gold.',
        tags: ['money', 'tips', 'early game'],
        faq: [
          {
            question: 'What is the fastest way to make money early in Stardew Valley?',
            answer: 'Fishing on rainy days plus crop planting on clear days. Spring fishing festival bundles help too.',
          },
        ],
        body: `Early gold funds upgrades. Mix daily activities instead of single-method grinding.

## Daily gold routine (Spring)

1. Water crops
2. Check TV luck and weather
3. Fish if raining, mine if sunny
4. Forage valley items before 10 AM energy spend

## Quick gold sources

| Method | When |
| --- | --- |
| Fishing | Rainy days |
| Foraging | Spring onion exploit area |
| Mining | Gems and ore sales |
| Crab pots | Passive coastal income |

## Bottom line

Rain = fish, sun = mine. Never skip crop watering — farm income scales every season.`,
      },
    ],
  },
  {
    slug: 'monster-hunter-wilds',
    title: 'Monster Hunter Wilds',
    guides: [
      {
        file: 'beginner-guide-hunting.mdx',
        title: 'Monster Hunter Wilds Beginner Guide: First Hunts',
        description:
          'Monster Hunter Wilds beginner guide — weapon choice, hunt flow, SOS flares, and armor upgrade priorities.',
        tags: ['beginner', 'hunting', 'combat'],
        faq: [
          {
            question: 'What weapon should beginners use in Monster Hunter Wilds?',
            answer: 'Sword & Shield and Long Sword are forgiving starters. Great Sword teaches positioning but slower pace.',
          },
        ],
        body: `Monster Hunter is about patience and preparation. Gear and knowledge beat reflexes.

## Hunt flow

1. Accept quest → eat meal
2. Track monster → engage
3. Watch tells → punish openings
4. Capture or kill before timer

## Beginner weapons

| Weapon | Difficulty |
| --- | --- |
| Sword & Shield | Easy — block and mobility |
| Long Sword | Medium — spirit gauge loop |
| Hammer | Medium — KO focused |
| Great Sword | Harder — commit timing |

## Bottom line

Sword & Shield or Long Sword for first 10 hunts. Craft armor from each monster you beat — defense matters.`,
      },
      {
        file: 'best-weapons-beginners.mdx',
        title: 'Monster Hunter Wilds Best Weapons for Beginners',
        description:
          'Best beginner weapons in Monster Hunter Wilds — move sets, mobility, and which weapon types to avoid early.',
        tags: ['weapons', 'beginner', 'tier list'],
        faq: [
          {
            question: 'Is Dual Blades good for beginners in Monster Hunter?',
            answer: 'Dual Blades are mobile but demand stamina management. Sword & Shield is safer for learning monster patterns.',
          },
        ],
        body: `Pick a weapon with defense options or range to learn monster rhythms safely.

## Top beginner picks

- **Sword & Shield** — block, items while guarding, fast combos
- **Long Sword** — foresight slash safety, high damage
- **Bow** — range to observe patterns (ammo management required)

## Avoid early

- Charge Blade — complex guard point timing
- Insect Glaive — kinsect management overhead

## Bottom line

Long Sword if you want damage, Sword & Shield if you want safety. Stick with one weapon for 20 hunts minimum.`,
      },
      {
        file: 'armor-skills-early.mdx',
        title: 'Monster Hunter Wilds Early Armor Skills Guide',
        description:
          'Best early armor skills in Monster Hunter Wilds — defense, resistance, and skill priorities before endgame sets.',
        tags: ['armor', 'skills', 'build'],
        faq: [
          {
            question: 'What armor skills matter most early in Monster Hunter?',
            answer: 'Health Boost, Divine Blessing, and elemental resistance for the monster you are farming. Attack Boost second.',
          },
        ],
        body: `Early armor is mix-and-match. Skills beat set bonuses until high rank.

## Priority skills

| Skill | Why |
| --- | --- |
| Health Boost | Larger HP pool = mistakes forgiven |
| Resistance | Match monster element |
| Attack Boost | Faster hunt times |
| Quick Sheathe | Mobility for all weapons |

## Farming tip

Farm 3–5 pieces from each early monster for balanced defense before chasing meta sets.

## Bottom line

Survive first, speed second. Health Boost and correct elemental resistance on mixed sets wins low rank.`,
      },
    ],
  },
  {
    slug: 'hogwarts-legacy',
    title: 'Hogwarts Legacy',
    guides: [
      {
        file: 'beginner-guide-spells.mdx',
        title: 'Hogwarts Legacy Beginner Guide: Spells and Combat',
        description:
          'Hogwarts Legacy beginner combat guide — spell diamonds, combos, Protego counters, and first-hour tips.',
        tags: ['beginner', 'spells', 'combat'],
        faq: [
          {
            question: 'How does Protego work in Hogwarts Legacy?',
            answer: 'Block with Protego at the right moment to stagger enemies. Perfect Protego reflects projectiles for bonus damage.',
          },
        ],
        body: `Spell combat uses four-slot diamonds. Swap sets for different enemy types.

## Core spell slots

| Color | Role |
| --- | --- |
| Purple | Control — Levioso, Accio |
| Red | Damage — Incendio, Diffindo |
| Yellow | Utility — Glacius, Arresto Momentum |
| Blue | Defense — Protego, Ancient Magic |

## Combat loop

1. Control spell (Levioso)
2. Damage combo while airborne
3. Protego counter ranged enemies
4. Ancient Magic finisher on elites

## Bottom line

Master Levioso → Incendio combo first. Perfect Protego turns defense into your best damage tool.`,
      },
      {
        file: 'best-talents-early.mdx',
        title: 'Hogwarts Legacy Best Talents for Early Game',
        description:
          'Best Hogwarts Legacy talent picks early — spell slots, Protego upgrades, and Ancient Magic boosts.',
        tags: ['talents', 'build', 'progression'],
        faq: [
          {
            question: 'When do talents unlock in Hogwarts Legacy?',
            answer: 'Talents unlock after the Jackdaw\'s Rest main quest. You earn talent points from leveling.',
          },
        ],
        body: `Talents customize your combat identity. Spell slot upgrades are highest priority.

## Must-pick early talents

- Extra spell set slots — flexibility in fights
- Protego Perfect — reflects projectiles
- Ancient Magic Focus — faster elite kills
- Basic Cast combo speed

## Tree priority

1. Core combat slots
2. Protego branch
3. Stealth (optional for XP farming)

## Bottom line

Unlock second spell diamond set first. Protego Perfect second — it trivializes many early encounters.`,
      },
      {
        file: 'gear-traits-guide.mdx',
        title: 'Hogwarts Legacy Gear Traits Guide',
        description:
          'Hogwarts Legacy gear traits explained — how to unlock, best traits per playstyle, and transmog tips.',
        tags: ['gear', 'traits', 'equipment'],
        faq: [
          {
            question: 'How do I unlock gear traits in Hogwarts Legacy?',
            answer: 'Complete challenges listed on gear pieces. Extract traits at the Loom of the Elder in the Room of Requirement.',
          },
        ],
        body: `Traits add passive bonuses to gear. Unlock via combat challenges, then apply at the Loom.

## Strong early traits

| Trait | Effect |
| --- | --- |
| Protego Shielding | Defense after block |
| Concentration | Spell damage |
| Ancient Magic Focus III | Elite damage |

## Workflow

1. Keep one piece per slot for transmog look
2. Upgrade stats at Loom
3. Apply traits matching your spell loadout

## Bottom line

Farm challenge completions on gear you actually wear. Concentration + spell slot talents = highest DPS early.`,
      },
    ],
  },
  {
    slug: 'valheim',
    title: 'Valheim',
    guides: [
      {
        file: 'beginner-guide-first-bosses.mdx',
        title: 'Valheim Beginner Guide: First Bosses and Progression',
        description:
          'Valheim beginner guide — Eikthyr to Bonemass order, biome progression, and essential crafting milestones.',
        tags: ['beginner', 'bosses', 'progression'],
        faq: [
          {
            question: 'What boss should I fight first in Valheim?',
            answer: 'Eikthyr in the Meadows is the first boss. Gather deer trophies and offer them at the Mystical Altar.',
          },
        ],
        body: `Valheim progression is biome-gated. Skipping bosses blocks gear tiers.

## Boss order

1. **Eikthyr** (Meadows) — antler pickaxe
2. **Elder** (Black Forest) — swamp key
3. **Bonemass** (Swamp) — wishbone
4. **Moder** (Mountains) — crystal
5. **Yagluth** (Plains) — endgame prep

## Milestones between bosses

| After | Unlock |
| --- | --- |
| Eikthyr | Flint tools, antler pickaxe |
| Elder | Bronze, karve boat |
| Bonemass | Iron, padded armor |

## Bottom line

Never enter a new biome undergeared. Beat Elder before serious swamp diving.`,
      },
      {
        file: 'best-base-location.mdx',
        title: 'Valheim Best Base Location Tips',
        description:
          'How to pick a base location in Valheim — biome perks, portal hubs, and flat terrain requirements.',
        tags: ['base', 'building', 'tips'],
        faq: [
          {
            question: 'Where is the best place to build a base in Valheim?',
            answer: 'Meadows near Black Forest border gives safe building with access to bronze resources. Flat coastlines are ideal.',
          },
        ],
        body: `Your main base needs flat ground, biome comfort, and portal access.

## Location checklist

- Flat 30m+ build area
- Near Black Forest for bronze
- Coast for boat access
- Away from boss summoning altars (destruction risk)

## Portal hub strategy

Build outposts with portals named by biome: \`Swamp\`, \`Mountains\`, \`Plains\`.

## Bottom line

Meadows-Black Forest border, coastal flat land, central portal hub. Comfort level 17+ for rested bonus.`,
      },
      {
        file: 'best-tools-progression.mdx',
        title: 'Valheim Tool and Weapon Progression Guide',
        description:
          'Valheim tool upgrade order — pickaxes, axes, weapons, and which materials to prioritize per biome.',
        tags: ['tools', 'weapons', 'crafting'],
        faq: [
          {
            question: 'What pickaxe mines iron in Valheim?',
            answer: 'Bronze pickaxe mines iron in swamps. You need the swamp key from the Elder boss first.',
          },
        ],
        body: `Tool tiers gate biomes. Upgrade tools before weapons when entering new zones.

## Tool priority list

| Tier | Tool | Material |
| --- | --- | --- |
| 1 | Flint tools | Meadows |
| 2 | Bronze | Copper + tin |
| 3 | Iron | Swamp crypts |
| 4 | Silver | Mountains |
| 5 | Blackmetal | Plains |

## Weapon note

Clubs and swords follow same material tiers. Craft bow for every biome — kiting saves food.

## Bottom line

Pickaxe upgrades unlock biomes. Rush bronze pickaxe and karve before swamp iron farming.`,
      },
    ],
  },
  {
    slug: 'lethal-company',
    title: 'Lethal Company',
    guides: [
      {
        file: 'beginner-guide-first-shifts.mdx',
        title: 'Lethal Company Beginner Guide: First Shifts',
        description:
          'Lethal Company beginner guide — scrap gathering, quota deadlines, ship upgrades, and staying alive indoors.',
        tags: ['beginner', 'co-op', 'scrap'],
        faq: [
          {
            question: 'How do I meet quota in Lethal Company?',
            answer: 'Collect scrap items inside facilities, scan with ship computer, and sell before the deadline. Balance risk vs value.',
          },
        ],
        body: `Lethal Company is risk-reward scavenging. Greed kills teams.

## First shift rules

1. Land, note weather and moon difficulty
2. Enter facility together
3. Grab high-value scrap near entrance first
4. Leave before 6 PM if quota met

## Essential items

| Item | Use |
| --- | --- |
| Flashlight | Indoor visibility |
| Shovel | Hoarding bug defense |
| Pro flashlights | Late-game runs |
| Walkie-talkie | Team comms |

## Bottom line

Meet easy quotas fast, leave early. Learn one moon's layout before pushing hard moons.`,
      },
      {
        file: 'best-items-to-buy.mdx',
        title: 'Lethal Company Best Items to Buy First',
        description:
          'Best Lethal Company ship upgrades and equipment — pro flashlights, jetpack, lockpicker order for new crews.',
        tags: ['items', 'upgrades', 'ship'],
        faq: [
          {
            question: 'What should I buy first in Lethal Company?',
            answer: 'Pro flashlights and walkie-talkies first. Shovel second. Jetpack is late-game luxury.',
          },
        ],
        body: `Ship upgrades multiply profit. Buy tools that reduce deaths before luxury items.

## Purchase priority

1. **Pro flashlights** — indoor survival
2. **Walkie-talkie** — coordination
3. **Shovel** — melee defense
4. **Lockpicker** — faster loot routes
5. **Jetpack** — advanced mobility

## Ship upgrades

- Teleporter before fancy decor
- Upgrade suit for more inventory if available

## Bottom line

Flashlights and comms first. Dead employees sell zero scrap.`,
      },
      {
        file: 'monster-survival-tips.mdx',
        title: 'Lethal Company Monster Survival Tips',
        description:
          'How to survive Lethal Company monsters — Coil-Head, Bracken, Jester, and general indoor survival rules.',
        tags: ['monsters', 'survival', 'tips'],
        faq: [
          {
            question: 'How do you survive Bracken in Lethal Company?',
            answer: 'Check behind you often. Bracken grabs from blind spots. Use stairs and doors to break line of sight.',
          },
        ],
        body: `Each monster has a tell. Learn audio cues before farming hard moons.

## Monster quick guide

| Monster | Counter |
| --- | --- |
| Coil-Head | Freeze when looking |
| Bracken | Check behind, use lights |
| Jester | Leave building before music ends |
| Nutcracker | Line of sight, peek corners |
| Ghost Girl | One player watches, others loot |

## Team callouts

- Name the monster when spotted
- Count down Jester music
- Designate a rear guard for Bracken moons

## Bottom line

Learn one monster per run. Coil-Head and Bracken cover 60% of early deaths — study them first.`,
      },
    ],
  },
  {
    slug: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2',
    guides: [
      {
        file: 'beginner-guide-open-world.mdx',
        title: 'Red Dead Redemption 2 Beginner Guide: Open World Tips',
        description:
          'RDR2 beginner guide — camp upgrades, honor system, dead eye, and open world activities worth your time.',
        tags: ['beginner', 'open world', 'camp'],
        faq: [
          {
            question: 'Should I upgrade camp in Red Dead Redemption 2?',
            answer: 'Yes. Upgrade the ledger and essentials early for fast travel map, ammo reserves, and morale buffs.',
          },
        ],
        body: `RDR2 rewards slow immersion. Camp upgrades and side content fund your gunslinger journey.

## Early priorities

1. Donate to camp ledger
2. Unlock fast travel via Hosea quest
3. Hunt for pelts — money and crafting
4. Practice Dead Eye on bounty hunters

## Systems to learn

| System | Tip |
| --- | --- |
| Dead Eye | Upgrade early — win gunfights |
| Honor | High honor = store discounts |
| Cores | Eat tonics, maintain yellow cores |
| Horses | Bond level 4 for best handling |

## Bottom line

Upgrade camp, bond with your horse, and use Dead Eye every fight until it becomes reflex.`,
      },
      {
        file: 'best-guns-early.mdx',
        title: 'Red Dead Redemption 2 Best Guns Early',
        description:
          'Best early weapons in RDR2 — Volcanic Pistol, Lancaster Repeater, and where to find free guns in Chapter 2.',
        tags: ['weapons', 'early game', 'combat'],
        faq: [
          {
            question: 'What is the best early gun in RDR2?',
            answer: 'Lancaster Repeater is the workhorse. Volcanic Pistol handles close range. Both available in Chapter 2.',
          },
        ],
        body: `Gun selection in RDR2 is about role coverage. One sniper, one repeater, one sidearm minimum.

## Best early loadout

| Slot | Weapon |
| --- | --- |
| Sidearm | Volcanic or Cattleman |
| Repeater | Lancaster |
| Rifle | Bolt Action (later Ch 3) |
| Shotgun | Pump-action for bears |

## Free guns tip

Complete side missions — many reward unique weapons without shop prices.

## Bottom line

Lancaster + Volcanic covers 90% of Chapter 2. Upgrade ammo types before buying new guns.`,
      },
      {
        file: 'money-honor-tips.mdx',
        title: 'Red Dead Redemption 2 Money and Honor Tips',
        description:
          'How to make money fast in RDR2 and manage honor — hunting, treasure maps, and moral choices that pay off.',
        tags: ['money', 'honor', 'tips'],
        faq: [
          {
            question: 'What is the fastest way to make money in RDR2?',
            answer: 'Legendary animal hunting, treasure maps, and story missions. Donate to camp but keep a personal reserve.',
          },
        ],
        body: `Money and honor both gate upgrades. Balance outlaw actions with occasional good deeds.

## Money methods

| Method | Effort |
| --- | --- |
| Perfect pelts | Medium — trappers pay well |
| Treasure maps | Low once found |
| Story missions | Guaranteed payouts |
| Robberies | High risk, honor loss |

## Honor tips

- Greet townsfolk (+micro honor)
- Donate to camp
- Release fish after catch
- Avoid unnecessary civilian kills

## Bottom line

Hunt perfect pelts for steady income. Keep honor high for shop discounts — they add up over Chapters 2–4.`,
      },
    ],
  },
  {
    slug: 'counter-strike-2',
    title: 'Counter-Strike 2',
    guides: [
      {
        file: 'beginner-guide-aim-training.mdx',
        title: 'Counter-Strike 2 Beginner Guide: Aim and Fundamentals',
        description:
          'CS2 beginner guide — crosshair placement, economy rounds, spray control, and first 100 hours roadmap.',
        tags: ['beginner', 'aim', 'fundamentals'],
        faq: [
          {
            question: 'What is the most important skill in CS2?',
            answer: 'Crosshair placement at head level. Pre-aim common angles before peeking.',
          },
        ],
        body: `CS2 fundamentals beat flashy plays. Crosshair placement and economy win more than raw flick aim.

## First 100 hours plan

1. Aim trainers — 20 min daily
2. Deathmatch — spray control practice
3. Premier/Comp — one map pool only
4. Review demos — note positioning deaths

## Economy basics

| Round type | Buy |
| --- | --- |
| Pistol | Armor + utility |
| Eco | Save for next |
| Force | Only if team coordinates |
| Full | Rifle + full nades |

## Bottom line

Head-level crosshair, learn one map callouts, never force buy alone. Mirage or Dust2 to start.`,
      },
      {
        file: 'best-settings-2026.mdx',
        title: 'Counter-Strike 2 Best Settings for Performance 2026',
        description:
          'Best CS2 PC settings for FPS and visibility — resolution, sensitivity, video options, and audio cues.',
        tags: ['settings', 'performance', 'pc'],
        faq: [
          {
            question: 'What sensitivity should I use in CS2?',
            answer: 'Low sens (400 DPI, 1.5–2.5 in-game) is standard for pros. Keep eDPI consistent and avoid changing weekly.',
          },
        ],
        body: `Settings should maximize FPS and enemy visibility without gimmicks.

## Recommended video settings

| Setting | Value |
| --- | --- |
| Resolution | Native or 4:3 stretched (preference) |
| Multisampling | 2x MSAA minimum |
| Shader detail | Low |
| Effect detail | Low |
| Boost player contrast | Enabled |

## Audio

- HRTF on for directional footsteps
- Music off in competitive

## Bottom line

Low graphics for FPS, boost contrast on, lock sensitivity for 30 days minimum before judging.`,
      },
      {
        file: 'dust2-callouts-guide.mdx',
        title: 'Counter-Strike 2 Dust2 Callouts Guide',
        description:
          'CS2 Dust2 callouts every player should know — catwalk, long, short, B site positions, and comms examples.',
        tags: ['maps', 'dust2', 'callouts'],
        faq: [
          {
            question: 'What are the main Dust2 callouts?',
            answer: 'Long A, Cat, Short, Mid, B Tunnels, Upper/Lower Dark, Window, Goose, X-Box, and Pit.',
          },
        ],
        body: `Dust2 is the default CS map. Shared callouts enable fast team info.

## Key callouts

| Area | Callout |
| --- | --- |
| A long | Long, Pit, Goose |
| Mid | Mid, Cat, Window |
| B site | Tunnels, Window, Plat |
| CT spawn | CT, Back Site |

## Comms examples

- "One long, one cat" — split A attack
- "B rush" — commit utility
- "Saved AWP mid" — rotate info

## Bottom line

Learn 15 callouts before ranked. Long, Cat, Short, Mid, B tunnels cover 90% of Dust2 rounds.`,
      },
    ],
  },
  {
    slug: 'sons-of-the-forest',
    title: 'Sons of the Forest',
    guides: [
      {
        file: 'beginner-guide-survival.mdx',
        title: 'Sons of the Forest Beginner Guide: Survival Basics',
        description:
          'Sons of the Forest survival guide — Kelvin commands, shelter, food, and first-week island priorities.',
        tags: ['beginner', 'survival', 'kelvin'],
        faq: [
          {
            question: 'How do I use Kelvin in Sons of the Forest?',
            answer: 'Use the notepad to assign commands: clear brush, gather logs, build. Kelvin is essential for solo base setup.',
          },
        ],
        body: `Sons of the Forest drops you on a hostile island. Kelvin is your first multiplier.

## Day 1–3 plan

1. Loot crash site
2. Assign Kelvin to gather sticks and logs
3. Build tarp shelter + fire
4. Find 3D printer and GPS locator

## Survival priorities

| Need | Solution |
| --- | --- |
| Food | Berries, hunt, dry meat |
| Shelter | Log cabin near water |
| Defense | Stick fences, traps |
| Light | Fire + torches at night |

## Bottom line

Command Kelvin early, establish water + food near base, find GPS before deep cave exploration.`,
      },
      {
        file: 'base-building-guide.mdx',
        title: 'Sons of the Forest Base Building Guide',
        description:
          'Best base designs in Sons of the Forest — log walls, defensive traps, 3D printer placement, and multiplayer tips.',
        tags: ['base', 'building', 'defense'],
        faq: [
          {
            question: 'What is the best base location in Sons of the Forest?',
            answer: 'Near freshwater with flat ground and cliff backing. Avoid mutant patrol paths if possible.',
          },
        ],
        body: `Strong bases reduce night raids and store crafting stations efficiently.

## Base components

- Log walls 2-high minimum
- Stick traps on approaches
- Drying rack + food storage inside
- 3D printer in protected room

## Multiplayer tip

Assign roles: one builder, one gatherer, one scout for cave materials.

## Bottom line

Flat lake-adjacent plots win. Printer + weapon rack inside a log fort before exploring endgame caves.`,
      },
      {
        file: 'best-weapons-crafting.mdx',
        title: 'Sons of the Forest Best Weapons and Crafting',
        description:
          'Best weapons in Sons of the Forest — crafted bows, 3D printed gear, and cave loot progression order.',
        tags: ['weapons', 'crafting', '3d printer'],
        faq: [
          {
            question: 'Where do I find the 3D printer in Sons of the Forest?',
            answer: 'Check bunkers and story caves marked on GPS. Printer resin is found in industrial loot zones.',
          },
        ],
        body: `Weapon power scales with cave progression. Crafted weapons bridge early gaps.

## Weapon progression

| Stage | Weapon |
| --- | --- |
| Day 1 | Crafted bow, spears |
| Week 1 | Stun gun, pistol from loot |
| Mid-game | Shotgun, printed armor |
| Late | Railgun, compound bow |

## 3D printer priorities

1. Mask / armor pieces
2. Ammo types
3. Utility items (flashlight upgrades)

## Bottom line

Bow + spears until pistol loot. Rush printer armor before the first major cave boss.`,
      },
    ],
  },
  {
    slug: 'satisfactory',
    title: 'Satisfactory',
    guides: [
      {
        file: 'beginner-guide-tier-0-2.mdx',
        title: 'Satisfactory Beginner Guide: Tiers 0–2',
        description:
          'Satisfactory beginner guide — HUB upgrades, biomass power, iron processing, and your first factory layout.',
        tags: ['beginner', 'factory', 'tiers'],
        faq: [
          {
            question: 'What should I build first in Satisfactory?',
            answer: 'HUB milestones for portable miners, then automate iron rods and plates on a clean manifold line.',
          },
        ],
        body: `Satisfactory factory games start messy — plan cleanup into Tier 3.

## Tiers 0–2 goals

1. HUB Milestone 0–2 for biomass miners
2. Iron rod + plate line (2:1 ratio knowledge)
3. Concrete for HUB upgrades
4. One biomass power plant

## Layout tip

Build on a flat plateau near pure iron and copper nodes.

## Bottom line

Portable miners on pure nodes, single-product lines before complexity. Concrete fuels HUB progression.`,
      },
      {
        file: 'optimal-factory-layout.mdx',
        title: 'Satisfactory Optimal Factory Layout Tips',
        description:
          'Satisfactory factory layout guide — manifold vs load balancer, spacing, and expansion room for megabase prep.',
        tags: ['layout', 'factory', 'tips'],
        faq: [
          {
            question: 'Manifold or load balancer in Satisfactory?',
            answer: 'Manifold is simpler for beginners — machines pull from a shared belt. Load balancers need exact splits.',
          },
        ],
        body: `Layout decisions haunt you at Tier 5+. Leave expansion space on day one.

## Manifold basics

- Main belt feeds machines in series
- Underclock last machines if belt starves
- Works for 90% of early production

## Spacing rules

- 4 foundations between machine rows
- Belt elevators at consistent heights
- Power poles every 2 machines

## Bottom line

Manifold iron and copper lines. Build wide, not tall, until trains unlock.`,
      },
      {
        file: 'power-generation-guide.mdx',
        title: 'Satisfactory Power Generation Guide',
        description:
          'Satisfactory power guide — biomass, coal, fuel generators, and how to avoid factory blackouts.',
        tags: ['power', 'energy', 'factory'],
        faq: [
          {
            question: 'When should I switch to coal power in Satisfactory?',
            answer: 'Coal unlocks around Tier 3–4. Switch when biomass cannot keep up with machine count.',
          },
        ],
        body: `Power outages halt entire factories. Overbuild generators by 20%.

## Power progression

| Source | Tier | Notes |
| --- | --- | --- |
| Biomass | 0–2 | Manual feeding early |
| Coal | 3–4 | Automate water + coal |
| Fuel | 5+ | Oil byproduct |
| Nuclear | Late | High setup, stable output |

## Blackout prevention

- Monitor HUB power graph
- Add generators before adding machine rows
- Separate power grid for oil extraction

## Bottom line

Coal power with automated water extractors is your first stable grid. Always overbuild capacity.`,
      },
    ],
  },
  {
    slug: 'rust',
    title: 'Rust',
    guides: [
      {
        file: 'beginner-guide-first-wipe.mdx',
        title: 'Rust Beginner Guide: Surviving Your First Wipe',
        description:
          'Rust beginner guide for fresh wipes — spawn picks, tool progression, base timing, and avoiding veteran raids.',
        tags: ['beginner', 'wipe', 'survival'],
        faq: [
          {
            question: 'Where should I build my first base in Rust?',
            answer: 'Hidden spots away from monuments, not on beaches. 2x2 honeycomb when you have enough stone.',
          },
        ],
        body: `Rust wipes are brutal. First goal: tools, bow, small base before night two.

## First hour

1. Spawn — run inland immediately
2. Stone hatchet + pickaxe
3. Hunt hemp for cloth bow
4. 1x1 with airlock before logging off

## Progression targets

| Time | Goal |
| --- | --- |
| Hour 1 | Bow, 1x1 |
| Day 1 | 2x2 stone |
| Day 2 | Workbench L1, furnace |
| Week 1 | Workbench L2, compound |

## Bottom line

Bow before PvP engagement. Offline in a secured 1x1 — naked beach spawns are free loot.`,
      },
      {
        file: 'base-building-raid-defense.mdx',
        title: 'Rust Base Building and Raid Defense',
        description:
          'Rust base building guide — honeycomb, bunker bases, airlocks, and how to survive offline raids.',
        tags: ['base', 'raiding', 'defense'],
        faq: [
          {
            question: 'What is the best starter base in Rust?',
            answer: '2x2 honeycomb with an airlock. Upgrade to stone quickly and spread loot across multiple rooms.',
          },
        ],
        body: `Raid defense is layers and loot splitting. One room bases die to one satchel.

## Starter base template

- 2x2 core with honeycomb
- Airlock airlock (double doors)
- Metal doors on tool cupboard
- Hide loot in separate sealed rooms

## Offline protection

- Logout with airlock sealed
- Dummy loot room (decoy)
- Avoid building on hills visible from monuments

## Bottom line

Honeycomb 2x2, upgrade TC room to metal first, never store everything in one box.`,
      },
      {
        file: 'best-weapons-pvp.mdx',
        title: 'Rust Best Weapons for PvP',
        description:
          'Best Rust PvP weapons by progression — bow, Python, Tommy, AK, and when to craft each.',
        tags: ['weapons', 'pvp', 'combat'],
        faq: [
          {
            question: 'What is the best early PvP weapon in Rust?',
            answer: 'Compound bow and nailgun are strong early. Python revolver is the first serious sidearm.',
          },
        ],
        body: `Weapon tiers map to monument access and scrap farming.

## PvP weapon tiers

| Tier | Weapon |
| --- | --- |
| Primitive | Bow, crossbow |
| Early | Python, Tommy |
| Mid | SAR, custom SMG |
| Late | AK, LR-300, bolt |

## Ammo economy

Craft what you can sustain. AK fights are scrap-expensive — bring meds and walls.

## Bottom line

Bow + Python until Workbench 2. AK only when you can afford kits to replace losses.`,
      },
    ],
  },
  {
    slug: 'terraria',
    title: 'Terraria',
    guides: [
      {
        file: 'beginner-guide-first-nights.mdx',
        title: 'Terraria Beginner Guide: First Nights and NPCs',
        description:
          'Terraria beginner guide — first house, NPC requirements, ore progression, and pre-boss gear checklist.',
        tags: ['beginner', 'npcs', 'building'],
        faq: [
          {
            question: 'How big does a house need to be in Terraria?',
            answer: 'At least 60 tiles interior with walls, door, light, chair, and table. Each NPC needs a valid room.',
          },
        ],
        body: `Terraria's first nights teach building rules and ore tiers. Shelter before exploration.

## First day checklist

1. Chop trees, build workbench
2. Build valid house before dusk
3. Explore surface chests
4. Dig to copper/tin depth

## Early NPC order

| NPC | Unlock |
| --- | --- |
| Guide | Start |
| Merchant | Silver coins |
| Nurse | Life crystal used |
| Demolitionist | Explosive in inventory |

## Bottom line

Valid house by night 1, horizontal mine to gold/platinum, heart crystals for Nurse.`,
      },
      {
        file: 'best-weapons-pre-hardmode.mdx',
        title: 'Terraria Best Pre-Hardmode Weapons',
        description:
          'Best Terraria weapons before Hardmode — boomerangs, bees, molten gear, and boss drop picks.',
        tags: ['weapons', 'pre-hardmode', 'gear'],
        faq: [
          {
            question: 'What is the best pre-Hardmode weapon in Terraria?',
            answer: "Molten Fury bow and Night's Edge melee are top picks. Bee Gun is strong for early bosses.",
          },
        ],
        body: `Pre-Hardmode weapon spikes come from bosses and the Underworld.

## Weapon progression

| Stage | Weapon |
| --- | --- |
| Early | Wooden boomerang, gem staves |
| Pre-Skeletron | Minishark, blade staff |
| Pre-WoF | Molten armor + Night's Edge |
| Post-WoF | Breaks at Hardmode start |

## Boss weapon drops

- Eye of Cthulhu — good early accessories
- Eater/Brain — shadow/crimson gear
- Queen Bee — Bee Gun

## Bottom line

Rush Underworld after Skeletron. Molten gear carries you into Wall of Flesh fight.`,
      },
      {
        file: 'boss-order-guide.mdx',
        title: 'Terraria Boss Order Guide',
        description:
          'Recommended Terraria boss order pre-Hardmode — Eye, Eater/Brain, Queen Bee, Skeletron, Wall of Flesh.',
        tags: ['boss', 'progression', 'order'],
        faq: [
          {
            question: 'What boss should I fight first in Terraria?',
            answer: 'Eye of Cthulhu with lens crafting at night. Stock healing potions and platforms.',
          },
        ],
        body: `Boss order gates loot tiers. Skipping bosses leaves you undergeared.

## Pre-Hardmode order

1. **Eye of Cthulhu**
2. **Eater of Worlds** or **Brain of Cthulhu**
3. **Queen Bee** (optional but strong loot)
4. **Skeletron**
5. **Wall of Flesh**

## Prep per boss

- Arena platforms
- 20+ healing potions
- Ironskin and regeneration potions
- Ranger or melee loadout per preference

## Bottom line

Eye → Evil biome boss → Skeletron → Underworld gear → Wall of Flesh. Do not enter Hardmode underprepared.`,
      },
    ],
  },
  {
    slug: 'ark-survival-ascended',
    title: 'Ark: Survival Ascended',
    guides: [
      {
        file: 'beginner-guide-first-days.mdx',
        title: 'Ark Survival Ascended Beginner Guide: First Days',
        description:
          'Ark Survival Ascended beginner guide — spawn zones, engram priorities, taming basics, and early base setup.',
        tags: ['beginner', 'taming', 'survival'],
        faq: [
          {
            question: 'Where is the best spawn in Ark Survival Ascended?',
            answer: 'South Zone 1 for beginners — fewer predators, easy resources. Avoid North until geared.',
          },
        ],
        body: `Ark ASA drops you into dinosaur chaos. Pick safe spawns and rush tools.

## Day 1 goals

1. Stone tools → bow
2. Thatched base with storage
3. Tame first dino (Parasaur or Trike)
4. Unlock mortar and pestle

## Engram priority

| Level | Engram |
| --- | --- |
| 1–10 | Bow, storage, campfire |
| 10–20 | Trike saddle, mortar |
| 20+ | Raptor saddle, crossbow |

## Bottom line

South spawn, bow by level 10, first herbivore tame for carry weight. Do not enter swamps early.`,
      },
      {
        file: 'best-tames-early.mdx',
        title: 'Ark Survival Ascended Best Early Tames',
        description:
          'Best early tames in Ark ASA — Parasaur, Trike, Raptor, and what each dino enables for progression.',
        tags: ['tames', 'dinosaurs', 'early game'],
        faq: [
          {
            question: 'What dinosaur should I tame first in Ark?',
            answer: 'Parasaur for berry gathering or Trike for thatch/wood. Raptor is your first combat mount.',
          },
        ],
        body: `Early tames are utility vehicles. Combat mounts come after resource tames.

## Tame order

| Dino | Role |
| --- | --- |
| Parasaur | Berry farmer, flee speed |
| Trike | Wood/thatch gatherer |
| Raptor | First combat mount |
| Pteranodon | Air transport |

## Taming tip

Stock narcotics and preferred food before knockout. Starve tame vs knockout depends on server settings.

## Bottom line

Trike for base building materials, Raptor for cave runs, Pteranodon ASAP for crystal and obsidian.`,
      },
      {
        file: 'base-locations-guide.mdx',
        title: 'Ark Survival Ascended Best Base Locations',
        description:
          'Best base locations on The Island in Ark ASA — hidden coves, resource access, and defense considerations.',
        tags: ['base', 'locations', 'building'],
        faq: [
          {
            question: 'Where should I build my main base in Ark ASA?',
            answer: 'Hidden Lake or Southern Islets offer flat build space with moderate threats. Near metal nodes is ideal.',
          },
        ],
        body: `Base location balances resources, defense, and expansion room.

## Top starter locations

| Area | Pros |
| --- | --- |
| Hidden Lake | Central, walled naturally |
| Southern Islets | Beach access, metal nearby |
| West Thumb | Cliff defense |

## Avoid early

- Snow biome — cold + rexes
- Swamp — crocs and insects
- Redwoods — apex predators

## Bottom line

Hidden Lake for safety, Southern Islets for metal rush. Cliff walls reduce turret needs later.`,
      },
    ],
  },
  {
    slug: 'the-finals',
    title: 'The Finals',
    guides: [
      {
        file: 'beginner-guide-game-modes.mdx',
        title: 'The Finals Beginner Guide: Game Modes and Roles',
        description:
          'The Finals beginner guide — Light, Medium, Heavy classes, cashout mode, and team role fundamentals.',
        tags: ['beginner', 'classes', 'modes'],
        faq: [
          {
            question: 'Which class is best for beginners in The Finals?',
            answer: 'Medium class balances mobility and health. Light is fast but fragile; Heavy anchors objectives.',
          },
        ],
        body: `The Finals is destructive arena FPS. Class pick defines your team role.

## Class overview

| Class | Role |
| --- | --- |
| Light | Flank, scout, quick revives |
| Medium | Flexible DPS/support |
| Heavy | Anchor, area denial |

## Cashout mode flow

1. Activate vault
2. Carry cashout to station
3. Defend during upload
4. Watch for third-party teams

## Bottom line

Learn Medium first. One Heavy per squad for objective holds, Lights for flanks and revives.`,
      },
      {
        file: 'best-loadouts-2026.mdx',
        title: 'The Finals Best Loadouts for 2026',
        description:
          'Best The Finals loadouts by class — weapons, gadgets, and specialization picks for ranked play.',
        tags: ['loadout', 'meta', 'weapons'],
        faq: [
          {
            question: 'What gadgets are meta in The Finals?',
            answer: 'C4, breach charges, and goo grenades for destruction. Defibrillators and jump pads for support.',
          },
        ],
        body: `Loadouts should enable destruction — this game rewards environmental kills.

## Medium meta loadout

- Primary: AKM or FCAR
- Secondary: Revolver or pistol
- Gadget 1: Breach charge
- Gadget 2: Defibrillator or goo

## Heavy meta loadout

- LMG primary
- Dome shield or mesh barrier
- C4 for objective denial

## Bottom line

Destruction gadgets win cashouts. Medium AKM + breach charge is the best learning loadout.`,
      },
      {
        file: 'map-strategies-guide.mdx',
        title: 'The Finals Map Strategies Guide',
        description:
          'The Finals map strategies — Monaco, Seoul, Las Vegas vault routes, vertical play, and escape paths.',
        tags: ['maps', 'strategy', 'tips'],
        faq: [
          {
            question: 'How do I win cashouts in The Finals?',
            answer: 'Control vertical routes, destroy cover near vaults, and time third-party pushes during enemy uploads.',
          },
        ],
        body: `Map knowledge separates cashout wins from endless firefights.

## Universal strategies

- Memorize vault spawn locations per map
- Pre-charge breach gadgets on common walls
- Zipline routes for fast extracts
- Third-party when two teams fight

## Map tips

| Map | Tip |
| --- | --- |
| Monaco | Vertical ziplines dominate |
| Seoul | Tight lanes — goo control |
| Las Vegas | Open sightlines — smoke and destroy |

## Bottom line

Learn one map deeply before ranked. Vault → fastest upload route → pre-planned escape path.`,
      },
    ],
  },
  {
    slug: 'dark-souls-iii',
    title: 'Dark Souls III',
    guides: [
      {
        file: 'beginner-guide-first-hours.mdx',
        title: 'Dark Souls III Beginner Guide: First Hours',
        description:
          'Dark Souls 3 beginner guide — class selection, i-frames, bonfire progression, and when to summon help.',
        tags: ['beginner', 'combat', 'progression'],
        faq: [
          {
            question: 'What class should I pick in Dark Souls 3?',
            answer: 'Knight or Mercenary for balanced stats. Deprived is for veterans. Knight has armor and Vigor.',
          },
        ],
        body: `Dark Souls III punishes panic rolling. Learn timing before damage optimization.

## First hours

1. Clear Cemetery of Ash
2. Level Vigor to 20 before Dex/Str
3. Use firebombs on tough groups
4. Summon NPCs or players for bosses

## Combat fundamentals

| Concept | Tip |
| --- | --- |
| Stamina | Never empty your bar |
| Roll timing | Mid-roll through attacks, not away |
| Shield | Hold up for learning, drop later |
| Weapon upgrade | +3 before Farron Keep |

## Bottom line

Knight start, Vigor first, learn enemy windups. Summon for Vordt if stuck — no shame.`,
      },
      {
        file: 'best-weapons-early.mdx',
        title: 'Dark Souls III Best Early Weapons',
        description:
          'Best early weapons in Dark Souls 3 — Long Sword, Claymore, Rapier, and infusion basics before Cathedral.',
        tags: ['weapons', 'early game', 'infusion'],
        faq: [
          {
            question: 'What is the best early weapon in Dark Souls 3?',
            answer: 'Long Sword is the community favorite. Claymore for greatsword users. Both scale well with infusions.',
          },
        ],
        body: `Early weapons matter less than upgrades. +6 standard beats unupgraded rare weapons.

## Top early weapons

| Weapon | Type | Notes |
| --- | --- | --- |
| Long Sword | Straight sword | Balanced, refine infusion |
| Claymore | Greatsword | Stagger machine |
| Rapier | Thrust | Critical damage king |
| Mace | Strike | Good vs armored knights |

## Infusion tip

Match infusion to highest stat — Raw before scaling stats reach soft caps.

## Bottom line

Long Sword refined to +6 carries early game. Claymore if you prefer stagger over speed.`,
      },
      {
        file: 'boss-order-tips.mdx',
        title: 'Dark Souls III Boss Order and Tips',
        description:
          'Dark Souls 3 recommended boss order — which optional bosses to skip early and when to tackle Cathedral.',
        tags: ['boss', 'order', 'tips'],
        faq: [
          {
            question: 'What boss should I fight after Vordt in Dark Souls 3?',
            answer: 'Undead Settlement and Road of Sacrifices before Cathedral Ward. Save Crystal Sage until you are comfortable.',
          },
        ],
        body: `Boss order affects soul level and weapon upgrades. Do not rush Cathedral.

## Early game route

1. Iudex Gundyr
2. Vordt of the Boreal Valley
3. Curse-Rotted Greatwood (optional)
4. Crystal Sage
5. Deacons of the Deep

## Optional early skips

- Catacombs before level 30 — skeleton hell
- Farron Keep without purple moss — poison misery

## Bottom line

Vordt → Settlement → Sage → Deacons. Level Vigor and upgrade weapon before each gate boss.`,
      },
    ],
  },
];

for (const game of newGames) {
  const dir = join(guidesRoot, game.slug);
  await mkdir(dir, { recursive: true });

  for (const guide of game.guides) {
    const faqYaml = guide.faq
      .map(
        (f) =>
          `  - question: "${f.question.replace(/"/g, '\\"')}"\n    answer: "${f.answer.replace(/"/g, '\\"')}"`,
      )
      .join('\n');

    const tagsYaml = guide.tags.map((t) => `"${t}"`).join(', ');

    const content = `---
title: "${guide.title.replace(/"/g, '\\"')}"
description: "${guide.description.replace(/"/g, '\\"')}"
game: ${game.slug}
publishedAt: 2026-07-04
tags: [${tagsYaml}]
faq:
${faqYaml}
---

${guide.body}
`;

    await writeFile(join(dir, guide.file), content, 'utf8');
    console.log(`Created ${game.slug}/${guide.file}`);
  }
}

console.log(`Done: ${newGames.length} games, ${newGames.reduce((n, g) => n + g.guides.length, 0)} guides`);
