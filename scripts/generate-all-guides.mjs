import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const guidesRoot = join(__dirname, '..', 'src', 'content', 'guides');
const MIN_GUIDES = 10;

const GAMES = {
  'meccha-chameleon': 'Meccha Chameleon',
  'path-of-exile-2': 'Path of Exile 2',
  'cyberpunk-2077': 'Cyberpunk 2077',
  'dead-by-daylight': 'Dead by Daylight',
  'marvel-rivals': 'Marvel Rivals',
  'forza-horizon-6': 'Forza Horizon 6',
  'baldurs-gate-3': "Baldur's Gate 3",
  'elden-ring': 'Elden Ring',
  palworld: 'Palworld',
  'helldivers-2': 'Helldivers 2',
  'black-myth-wukong': 'Black Myth: Wukong',
  'hades-ii': 'Hades II',
  'stardew-valley': 'Stardew Valley',
  'monster-hunter-wilds': 'Monster Hunter Wilds',
  'hogwarts-legacy': 'Hogwarts Legacy',
  valheim: 'Valheim',
  'lethal-company': 'Lethal Company',
  'red-dead-redemption-2': 'Red Dead Redemption 2',
  'counter-strike-2': 'Counter-Strike 2',
  'sons-of-the-forest': 'Sons of the Forest',
  satisfactory: 'Satisfactory',
  rust: 'Rust',
  terraria: 'Terraria',
  'ark-survival-ascended': 'Ark: Survival Ascended',
  'the-finals': 'The Finals',
  'dark-souls-iii': 'Dark Souls III',
};

/** 12 guide topics per game — script skips files that already exist */
const TOPICS = {
  'meccha-chameleon': [
    ['beginner-guide-how-to-hide-and-win', 'Beginner Guide: How to Hide and Win', 'beginner', 'Learn hide-and-seek basics, paint matching, and first-win strategies for Meccha Chameleon.'],
    ['best-hiding-spots-every-map', 'Best Hiding Spots on Every Map', 'maps', 'Top hiding spots per map — sightlines, paint zones, and seeker blind spots.'],
    ['seeker-tips-movement-guide', 'Seeker Tips and Movement Guide', 'seeker', 'How to hunt effectively as seeker — sound cues, sweep patterns, and paint reveals.'],
    ['controller-vs-keyboard-settings', 'Controller vs Keyboard Settings', 'settings', 'Best controller and keyboard settings, sensitivity, and keybinds for Meccha Chameleon.'],
    ['is-meccha-chameleon-worth-buying', 'Is Meccha Chameleon Worth Buying in 2026?', 'review', 'Honest buying advice — player count, content depth, and who should buy.'],
    ['advanced-paint-techniques', 'Advanced Paint Techniques', 'advanced', 'Pro paint blending, edge hiding, and animation cancel tricks.'],
    ['ranked-lobby-tips', 'Ranked Lobby Tips', 'ranked', 'Ranked match etiquette, role picks, and climbing tips.'],
    ['custom-lobby-game-modes', 'Custom Lobby and Game Modes Guide', 'multiplayer', 'Host custom lobbies, rule sets, and fun variants with friends.'],
    ['map-rotation-strategies', 'Map Rotation Strategies', 'maps', 'How map rotation works and prep strategies for each environment.'],
    ['team-communication-guide', 'Team Communication Guide', 'multiplayer', 'Callouts, Discord setup, and coordinated hide teams.'],
    ['fps-performance-settings', 'Best FPS and Performance Settings', 'settings', 'PC graphics settings for smooth frames in chaotic lobbies.'],
    ['seasonal-update-preview', 'Seasonal Update and Patch Notes Guide', 'updates', 'Track patches, balance changes, and new map releases.'],
  ],
  'path-of-exile-2': [
    ['best-starter-builds-beginners', 'Best Starter Builds for Beginners', 'builds', 'Top PoE2 starter builds — Mercenary, Sorceress, Monk, and safe league starts.'],
    ['acts-1-3-leveling-guide', 'Acts 1–3 Leveling Guide', 'leveling', 'Fast act 1–3 routing, quest order, and gear upgrades.'],
    ['currency-economy-tips', 'Currency and Economy Tips', 'economy', 'Chaos, exalts, trading basics, and what to pick up early.'],
    ['early-act-boss-guide', 'Early Act Boss Guide', 'boss', 'How to beat early act bosses — mechanics, resistances, and flask timing.'],
    ['sorceress-vs-monk-which-to-pick', 'Sorceress vs Monk: Which to Pick', 'class', 'Compare Sorceress and Monk for your first character.'],
    ['mercenary-lightning-spear-build', 'Mercenary Lightning Spear Build', 'build', 'Full Mercenary Lightning Spear build guide with passives and gear.'],
    ['mapping-waystones-guide', 'Mapping and Waystones Guide', 'endgame', 'Waystone tiers, map mods, and atlas progression basics.'],
    ['gem-linking-socket-guide', 'Gem Linking and Socket Guide', 'crafting', 'Socket colors, linking, and support gem priorities.'],
    ['resistance-cap-guide', 'Resistance Cap Guide', 'defense', 'Hit 75% resistances — gear, passives, and flask setups.'],
    ['flask-crafting-basics', 'Flask Crafting Basics', 'crafting', 'Craft life, mana, and utility flasks for mapping.'],
    ['unique-item-priority', 'Unique Item Pickup Priority', 'loot', 'Which uniques to keep, sell, or stash for builds.'],
    ['party-play-coop-tips', 'Party Play and Co-op Tips', 'multiplayer', 'Level with friends — loot rules, aura sharing, and party scaling.'],
  ],
  'cyberpunk-2077': [
    ['best-builds-patch-2', 'Best Builds for Patch 2.x', 'builds', 'Top Patch 2.x builds — Sandevistan, hacking, and tank setups.'],
    ['phantom-liberty-where-to-start', 'Phantom Liberty: Where to Start', 'dlc', 'When to start Phantom Liberty and power level recommendations.'],
    ['best-cyberware-early-game', 'Best Cyberware Early Game', 'cyberware', 'Early cyberware picks — Sandevistan, Kerenzikov, and OS choices.'],
    ['ending-guide-no-spoilers', 'Ending Guide (No Spoilers)', 'story', 'How choices affect endings without spoiling plot beats.'],
    ['best-settings-pc-performance', 'Best PC Settings for Performance', 'settings', 'DLSS, ray tracing, and FPS optimization for Night City.'],
    ['best-weapons-early-game', 'Best Weapons Early Game', 'weapons', 'Early iconic and rare weapons worth detouring for.'],
    ['vehicles-fast-travel-guide', 'Vehicles and Fast Travel Guide', 'exploration', 'Best cars, bikes, and fast travel unlock order.'],
    ['stealth-hacking-build', 'Stealth Hacking Build Guide', 'build', 'Stealth netrunner build — quickhacks, RAM, and perk order.'],
    ['street-samurai-melee-build', 'Street Samurai Melee Build', 'build', 'Blade and fist build with Kerenzikov timing.'],
    ['ncpd-scanner-farming', 'NCPD Scanner Farming Guide', 'farming', 'Farm eddies and XP from NCPD encounters efficiently.'],
    ['romance-companion-guide', 'Romance and Companion Guide', 'story', 'Romance options, dialogue tips, and companion quests.'],
    ['perk-attribute-respec', 'Perk and Attribute Respec Guide', 'progression', 'How to respec attributes and perks in Patch 2.x.'],
  ],
  'dead-by-daylight': [
    ['best-survivor-perks-2026', 'Best Survivor Perks in 2026', 'perks', 'Meta survivor perks for looping, healing, and gen speed.'],
    ['best-killer-for-beginners', 'Best Killer for Beginners', 'killer', 'Easiest killers to learn — trap placement and chase fundamentals.'],
    ['how-to-loop-killers', 'How to Loop Killers', 'survivor', 'Tile looping, mind games, and when to drop pallets.'],
    ['bloodpoint-farming-guide', 'Bloodpoint Farming Guide', 'farming', 'Fast bloodpoint methods for survivors and killers.'],
    ['is-dead-by-daylight-worth-it-2026', 'Is Dead by Daylight Worth It in 2026?', 'review', 'Current player count, balance, and new player experience.'],
    ['best-survivor-characters-2026', 'Best Survivor Characters in 2026', 'characters', 'Top survivor characters and their teachable perks.'],
    ['chase-mindgames-guide', 'Chase Mindgames Guide', 'survivor', 'Advanced chase mindgames — fakes, double-backs, and window tech.'],
    ['killer-perk-builds-meta', 'Killer Perk Builds Meta', 'killer', 'Meta killer builds for ranked play in 2026.'],
    ['hex-and-boon-totems', 'Hex and Boon Totems Guide', 'totems', 'Cleanse priority, boon placement, and hex denial.'],
    ['ranked-matchmaking-tips', 'Ranked Matchmaking Tips', 'ranked', 'Climb ranks — consistency, role picks, and tilt management.'],
    ['event-challenges-guide', 'Event Challenges Guide', 'events', 'Complete event challenges fast for cosmetics and rewards.'],
    ['map-specific-strategies', 'Map-Specific Strategies', 'maps', 'Best strategies per realm — loops, dead zones, and spawns.'],
  ],
  'marvel-rivals': [
    ['best-heroes-for-beginners', 'Best Heroes for Beginners', 'heroes', 'Easiest heroes per role for new Marvel Rivals players.'],
    ['team-composition-guide', 'Team Composition Guide', 'team', 'Standard 2-2-2 comps and flex picks for ranked.'],
    ['spider-man-guide', 'Spider-Man Guide', 'hero', 'Spider-Man combos, web mobility, and dive targets.'],
    ['support-role-guide', 'Support Role Guide', 'role', 'How to play Strategist — positioning, ult timing, peel.'],
    ['is-marvel-rivals-worth-playing-2026', 'Is Marvel Rivals Worth Playing in 2026?', 'review', 'Player base, balance patches, and F2P fairness.'],
    ['duelist-tier-list-2026', 'Duelist Tier List 2026', 'tier list', 'Current duelist rankings for competitive play.'],
    ['vanguard-tank-positioning', 'Vanguard Tank Positioning', 'role', 'Space creation, shield management, and peel timing.'],
    ['ultimate-combo-guide', 'Ultimate Combo Guide', 'combos', 'Team ultimate combos that win team fights.'],
    ['map-control-objectives', 'Map Control and Objectives', 'maps', 'Payload, convoy, and domination strategies per map.'],
    ['ranked-climb-guide', 'Ranked Climb Guide', 'ranked', 'From Bronze to Diamond — fundamentals and hero pools.'],
    ['cosmetics-battle-pass-tips', 'Cosmetics and Battle Pass Tips', 'progression', 'Maximize battle pass XP and event cosmetics.'],
    ['controller-aim-settings', 'Controller Aim Settings', 'settings', 'Best controller sensitivity and aim assist settings.'],
  ],
  'forza-horizon-6': [
    ['best-starter-cars', 'Best Starter Cars', 'cars', 'Top starter cars for story, rivals, and festival races.'],
    ['credit-farming-guide', 'Credit Farming Guide', 'farming', 'Fast credit methods — skill chains, auctions, and events.'],
    ['drift-tuning-basics', 'Drift Tuning Basics', 'tuning', 'Drift tune setup — tire pressure, gearing, and assists.'],
    ['seasonal-events-guide', 'Seasonal Events Guide', 'events', 'Seasonal playlist rewards and optimal event routing.'],
    ['best-pc-settings-performance', 'Best PC Settings for Performance', 'settings', 'FH6 PC graphics and FPS optimization.'],
    ['rally-vs-circuit-builds', 'Rally vs Circuit Builds', 'racing', 'Car builds for dirt, road, and mixed-surface events.'],
    ['online-multiplayer-tips', 'Online Multiplayer Tips', 'multiplayer', 'Horizon Open etiquette, convoys, and grief avoidance.'],
    ['car-auction-house-guide', 'Car Auction House Guide', 'economy', 'Snipe deals, sell meta cars, and auction timing.'],
    ['photography-challenges', 'Photography Challenges Guide', 'challenges', 'Complete photo challenges for accolades and credits.'],
    ['wheel-vs-controller', 'Wheel vs Controller Guide', 'hardware', 'Wheel setup vs controller — assists and sensitivity.'],
    ['festival-playlist-rewards', 'Festival Playlist Rewards', 'events', 'Maximize seasonal festival points each week.'],
    ['s-tier-meta-cars-2026', 'S-Tier Meta Cars 2026', 'tier list', 'Current meta cars for ranked rivals and online.'],
  ],
  'baldurs-gate-3': [
    ['beginner-guide-first-act', 'Beginner Guide: First Act Survival', 'beginner', 'Act 1 combat, resting, and exploration fundamentals.'],
    ['best-class-first-playthrough', 'Best Class for First Playthrough', 'class', 'Fighter, Paladin, Cleric picks for new players.'],
    ['best-companions-act-1', 'Best Companions to Recruit in Act 1', 'companions', 'Party synergy and approval tips for Act 1.'],
    ['act-2-underdark-route', 'Act 2 Underdark Route Guide', 'walkthrough', 'Underdark vs Mountain Pass — loot and quest differences.'],
    ['romance-approval-guide', 'Romance and Approval Guide', 'story', 'Companion approval, romance triggers, and dialogue tips.'],
    ['stealth-thief-build', 'Stealth Thief Build Guide', 'build', 'Rogue/Monk stealth build for Act 1 dominance.'],
    ['honour-mode-tips', 'Honour Mode Tips', 'hardcore', 'Save scumming rules, permadeath prep, and party safety.'],
    ['legendary-loot-locations', 'Legendary Loot Locations', 'loot', 'Act 1–2 legendary gear without major spoilers.'],
    ['multiclass-combos-guide', 'Multiclass Combos Guide', 'build', 'Popular multiclass dips — Paladin/Sorcerer, Fighter/Wizard.'],
    ['boss-fight-strategies', 'Boss Fight Strategies', 'boss', 'General boss patterns — action economy and surface combos.'],
    ['mod-support-guide', 'Mod Support Guide', 'mods', 'Install mods safely — load order and multiplayer rules.'],
    ['tiefling-grove-choices', 'Tiefling Grove Choices Guide', 'story', 'Grove decision outcomes and long-term consequences.'],
  ],
  'elden-ring': [
    ['beginner-guide-open-world', 'Beginner Guide: Open World Basics', 'beginner', 'Safe routes, Sites of Grace, and leveling priorities.'],
    ['best-starter-weapons', 'Best Starter Weapons', 'weapons', 'Claymore, Bloodhound Fang, and early weapon picks.'],
    ['best-ashes-of-war-early', 'Best Ashes of War Early', 'skills', 'Bloodhound Step, Lion Claw, and ash locations.'],
    ['margit-godrick-strategies', 'Margit and Godrick Strategies', 'boss', 'Beat first legacy dungeons — summon help and builds.'],
    ['rune-farming-early', 'Early Rune Farming Spots', 'farming', 'Safe rune farm locations before Caelid.'],
    ['spirit-ashes-upgrade', 'Spirit Ashes Upgrade Guide', 'summons', 'Best spirit ashes and upgrade material farming.'],
    ['caelid-survival-guide', 'Caelid Survival Guide', 'exploration', 'Navigate rot, scarlet swamp, and Fort Gael.'],
    ['ranni-questline-overview', 'Ranni Questline Overview', 'quest', 'Key steps for Ranni ending route without full spoilers.'],
    ['pvp-duel-meta', 'PvP Duel Meta Builds', 'pvp', 'Popular PvP weapons and talismans for duels.'],
    ['co-op-summoning-guide', 'Co-op Summoning Guide', 'multiplayer', 'Furled fingers, passwords, and boss co-op etiquette.'],
    ['talismans-best-early', 'Best Early Talismans', 'gear', 'Green Turtle, Radagon Scarseal, and early talisman picks.'],
    ['ng-plus-carry-over', 'NG+ Carry Over Guide', 'endgame', 'What carries to NG+ and optimal first NG+ route.'],
  ],
  palworld: [
    ['beginner-guide-first-day', 'Beginner Guide: Your First Day', 'beginner', 'First catches, base setup, and hunger management.'],
    ['best-pals-early-game', 'Best Pals for Early Game', 'pals', 'Top early Pals for combat and base work.'],
    ['base-building-tips', 'Base Building Tips', 'base', 'Compact layouts and Pal pathing fixes.'],
    ['breeding-combos-guide', 'Breeding Combos Guide', 'breeding', 'Passive skills, egg incubation, and top combos.'],
    ['legendary-pal-locations', 'Legendary Pal Locations', 'pals', 'Where to find legendary and rare Pals.'],
    ['boss-tower-order', 'Boss Tower Order Guide', 'boss', 'Tower bosses, recommended levels, and team comps.'],
    ['oil-rig-loot-runs', 'Oil Rig Loot Runs', 'endgame', 'Raid oil rigs for weapons and high-tier loot.'],
    ['pvp-base-raid-defense', 'PvP Base Raid Defense', 'pvp', 'Defend bases on PvP servers — walls and Pal guards.'],
    ['technology-unlock-priority', 'Technology Unlock Priority', 'tech', 'Best technology order for fast progression.'],
    ['pal-stats-iv-guide', 'Pal Stats and IV Guide', 'stats', 'Understand Pal stats, IVs, and breeding targets.'],
    ['mount-travel-guide', 'Mount and Travel Guide', 'exploration', 'Fastest mounts and traversal Pals per biome.'],
    ['multiplayer-server-tips', 'Multiplayer Server Tips', 'multiplayer', 'Dedicated servers, griefing rules, and guild play.'],
  ],
  'helldivers-2': [
    ['beginner-guide-survival', 'Beginner Guide: Survive First Missions', 'beginner', 'Stratagem calls, armor types, and mission flow.'],
    ['best-weapons-loadouts', 'Best Weapons and Loadouts', 'loadout', 'Primary picks and grenades for low-level play.'],
    ['best-stratagem-combos', 'Best Stratagem Combos', 'stratagems', 'Team stratagem synergy per faction.'],
    ['terminid-bug-strategies', 'Terminid Bug Strategies', 'faction', 'Bug mission tactics — bile, chargers, and bile spewers.'],
    ['automaton-bot-strategies', 'Automaton Bot Strategies', 'faction', 'Bot weak points, factory strikes, and shield packs.'],
    ['illuminate-strategies', 'Illuminate Strategies', 'faction', 'Shield packs, harpies, and illuminate-specific loadouts.'],
    ['armor-passive-guide', 'Armor Passive Guide', 'armor', 'Best armor passives per playstyle.'],
    ['sample-packs-loot', 'Sample Packs and Loot Guide', 'loot', 'Super samples, common samples, and XP farming.'],
    ['difficulty-tier-climb', 'Difficulty Tier Climb Guide', 'progression', 'Move from Trivial to Helldive safely.'],
    ['friendly-fire-prevention', 'Friendly Fire Prevention', 'tips', 'Avoid team kills with ordnance and fire lanes.'],
    ['warbond-unlock-priority', 'Warbond Unlock Priority', 'progression', 'Which warbond items to buy first.'],
    ['co-op-communication', 'Co-op Communication Guide', 'multiplayer', 'Ping systems, voice comms, and squad roles.'],
  ],
  'black-myth-wukong': [
    ['beginner-guide-combat', 'Beginner Guide: Combat Fundamentals', 'beginner', 'Staff stances, dodge timing, and cultivation.'],
    ['best-spells-transformations', 'Best Spells and Transformations', 'spells', 'Immobilize, Cloud Step, and transformation usage.'],
    ['early-boss-tips', 'Early Boss Tips', 'boss', 'Pattern learning, consumables, and farming Will.'],
    ['staff-stance-mastery', 'Staff Stance Mastery Guide', 'combat', 'Smash vs Pillar vs Thrust — when to switch.'],
    ['spirit-collection-guide', 'Spirit Collection Guide', 'collectibles', 'Track and upgrade spirits for passive bonuses.'],
    ['armor-weapon-upgrade', 'Armor and Weapon Upgrade Guide', 'gear', 'Crafting paths and material farming routes.'],
    ['secret-bosses-locations', 'Secret Bosses and Locations', 'secrets', 'Optional bosses and hidden areas overview.'],
    ['new-game-plus-tips', 'New Game Plus Tips', 'endgame', 'NG+ scaling, build optimization, and challenge runs.'],
    ['medicine-crafting-guide', 'Medicine Crafting Guide', 'crafting', 'Best pills and consumables for boss attempts.'],
    ['transformation-spirit-builds', 'Transformation Spirit Builds', 'build', 'Match transformations to boss weaknesses.'],
    ['chapter-progression-order', 'Chapter Progression Order', 'walkthrough', 'Recommended chapter route for smooth power curve.'],
    ['photo-mode-secrets', 'Hidden Secrets and Collectibles', 'exploration', 'Meditation spots, lore, and collectible checklist.'],
  ],
  'hades-ii': [
    ['beginner-guide-first-runs', 'Beginner Guide: First Runs', 'beginner', 'Melinoë basics, weapons, and between-run upgrades.'],
    ['best-weapon-aspects', 'Best Weapon Aspects', 'weapons', 'Aspect unlocks and investment priority.'],
    ['boon-synergies-guide', 'Boon Synergies Guide', 'boons', 'Olympian pairings and duo boon setup.'],
    ['keepsake-selection-guide', 'Keepsake Selection Guide', 'keepsakes', 'Best keepsakes per boss and biome.'],
    ['hex-selene-guide', 'Hex and Selene Guide', 'hexes', 'Selene hex picks and night cycle strategy.'],
    ['incantation-crafting', 'Incantation Crafting Guide', 'crafting', 'Permanent upgrades at the Crossroads.'],
    ['biome-survival-tips', 'Biome Survival Tips', 'biomes', 'Erebus, Oceanus, and surface route tips.'],
    ['familiar-companion-guide', 'Familiar Companion Guide', 'companions', 'Frog, cat, and familiar ability usage.'],
    ['heat-chaos-trials', 'Heat and Chaos Trials', 'endgame', 'Increase difficulty modifiers for rewards.'],
    ['resource-gathering-routes', 'Resource Gathering Routes', 'farming', 'Never skip gathering — optimal route per run.'],
    ['boss-pattern-guide', 'Boss Pattern Guide', 'boss', 'Learn tell windows for act bosses.'],
    ['story-quest-unlocks', 'Story Quest Unlocks Guide', 'story', 'Narrative progression and unlock conditions.'],
  ],
  'stardew-valley': [
    ['beginner-guide-first-year', 'Beginner Guide: First Year Plan', 'beginner', 'Seasonal priorities and community center vs Joja.'],
    ['best-crops-by-season', 'Best Crops by Season', 'farming', 'Most profitable crops per season.'],
    ['money-making-early', 'Early Money Making Tips', 'money', 'Fishing, foraging, and daily gold routine.'],
    ['community-center-bundles', 'Community Center Bundles Guide', 'bundles', 'Bundle checklist and seasonal item prep.'],
    ['mining-skull-cavern', 'Mining and Skull Cavern Guide', 'mining', 'Mine levels, bombs, and cavern prep.'],
    ['fishing-profession-guide', 'Fishing Profession Guide', 'fishing', 'Best fishing spots, tackle, and legendaries.'],
    ['relationship-gifts-guide', 'Relationship and Gifts Guide', 'social', 'Gift preferences and heart event tips.'],
    ['animal-husbandry-tips', 'Animal Husbandry Tips', 'animals', 'When to buy animals and barn/coop layout.'],
    ['greenhouse-optimization', 'Greenhouse Optimization', 'farming', 'Best greenhouse layout for year-round profit.'],
    ['winter-year-one', 'Winter Year One Guide', 'seasonal', 'What to do in winter when crops die.'],
    ['joja-route-guide', 'Joja Route Guide', 'story', 'Joja membership path and cost comparison.'],
    ['perfection-endgame', 'Perfection Endgame Checklist', 'endgame', '100% completion goals and tracking.'],
  ],
  'monster-hunter-wilds': [
    ['beginner-guide-hunting', 'Beginner Guide: First Hunts', 'beginner', 'Weapon choice, hunt flow, and armor upgrades.'],
    ['best-weapons-beginners', 'Best Weapons for Beginners', 'weapons', 'Sword & Shield, Long Sword, and Bow picks.'],
    ['armor-skills-early', 'Early Armor Skills Guide', 'armor', 'Health Boost, resistance, and skill priorities.'],
    ['capture-vs-kill', 'Capture vs Kill Guide', 'hunting', 'When to capture monsters for extra rewards.'],
    ['elemental-weakness-chart', 'Elemental Weakness Guide', 'combat', 'Match weapon elements to monster weaknesses.'],
    ['palico-support-build', 'Palico Support Build Guide', 'palico', 'Best Palico gadgets and support roles.'],
    ['multiplayer-hunt-etiquette', 'Multiplayer Hunt Etiquette', 'multiplayer', 'Join codes, flares, and team damage tips.'],
    ['crafting-material-farming', 'Crafting Material Farming', 'crafting', 'Farm bones, ores, and monster parts efficiently.'],
    ['endgame-armor-sets', 'Endgame Armor Sets Guide', 'endgame', 'Meta armor sets and decoration slots.'],
    ['tempered-monster-tips', 'Tempered Monster Tips', 'endgame', 'Track levels, investigations, and rewards.'],
    ['food-buff-meals', 'Food Buff Meals Guide', 'buffs', 'Canteen meals and buff stacking before hunts.'],
    ['environmental-traps', 'Environmental Traps Guide', 'hunting', 'Use terrain, traps, and status for faster kills.'],
  ],
  'hogwarts-legacy': [
    ['beginner-guide-spells', 'Beginner Guide: Spells and Combat', 'beginner', 'Spell diamonds, Protego, and combos.'],
    ['best-talents-early', 'Best Talents Early Game', 'talents', 'Spell slots, Protego Perfect, Ancient Magic.'],
    ['gear-traits-guide', 'Gear Traits Guide', 'gear', 'Unlock traits at the Loom and best picks.'],
    ['beast-collection-room', 'Beast Collection Room Guide', 'beasts', 'Catch, breed, and care for magical beasts.'],
    ['room-of-requirement', 'Room of Requirement Guide', 'base', 'Conjuration, potion stations, and loom setup.'],
    ['broom-flight-races', 'Broom Flight and Races Guide', 'exploration', 'Unlock best broom and win flight trials.'],
    ['dark-arts-restricted', 'Dark Arts and Restricted Spells', 'spells', 'Unforgivable spells and morality impact.'],
    ['merlin-trials-solutions', 'Merlin Trials Solutions', 'puzzles', 'Solve Merlin trials for inventory slots.'],
    ['house-quest-differences', 'House Quest Differences', 'story', 'Unique house quests and common room perks.'],
    ['ancient-magic-build', 'Ancient Magic Build Guide', 'build', 'Maximize Ancient Magic meter and finishers.'],
    ['gear-transmog-style', 'Gear Transmog and Style Guide', 'cosmetics', 'Look good while keeping best stats.'],
    ['collectibles-field-guide', 'Collectibles Field Guide', 'collectibles', 'Demiguise statues, pages, and chests.'],
  ],
  valheim: [
    ['beginner-guide-first-bosses', 'Beginner Guide: First Bosses', 'beginner', 'Eikthyr to Bonemass order and milestones.'],
    ['best-base-location', 'Best Base Location Tips', 'base', 'Flat terrain, portals, and biome access.'],
    ['best-tools-progression', 'Tool and Weapon Progression', 'tools', 'Pickaxe tiers and material gates.'],
    ['sailing-ship-guide', 'Sailing and Ship Guide', 'exploration', 'Karve vs longship, wind, and ocean routes.'],
    ['food-stamina-buffs', 'Food and Stamina Buffs Guide', 'survival', 'Best food combos for HP and stamina.'],
    ['mistlands-update-guide', 'Mistlands Biome Guide', 'biome', 'Navigate mist, seeker broods, and eitr.'],
    ['boss-summoning-preparation', 'Boss Summoning Preparation', 'boss', 'Offerings, arenas, and team prep.'],
    ['multiplayer-server-setup', 'Multiplayer Server Setup', 'multiplayer', 'Dedicated servers, passwords, and backups.'],
    ['building-decay-repair', 'Building Decay and Repair', 'building', 'Workbenches, rain cover, and structural integrity.'],
    ['farming-animals-breeding', 'Farming Animals and Breeding', 'farming', 'Tame boars, wolves, and lox for resources.'],
    ['pvp-base-raiding', 'PvP Base Raiding Tips', 'pvp', 'Raid windows, breach tactics, and defenses.'],
    ['endgame-yagluth-prep', 'Endgame Yagluth Prep', 'endgame', 'Plains gear, deathsquito defense, and boss kit.'],
  ],
  'lethal-company': [
    ['beginner-guide-first-shifts', 'Beginner Guide: First Shifts', 'beginner', 'Quota runs, scrap value, and ship basics.'],
    ['best-items-to-buy', 'Best Items to Buy First', 'items', 'Flashlights, shovel, jetpack purchase order.'],
    ['monster-survival-tips', 'Monster Survival Tips', 'monsters', 'Coil-Head, Bracken, Jester counters.'],
    ['moon-difficulty-tier-list', 'Moon Difficulty Tier List', 'moons', 'Easiest to hardest moons for progression.'],
    ['scrap-value-priority', 'Scrap Value Priority Guide', 'loot', 'High-value scrap and weight management.'],
    ['indoor-facility-routes', 'Indoor Facility Routes', 'maps', 'Entrance loot paths and exit timing.'],
    ['weather-hazard-guide', 'Weather Hazard Guide', 'weather', 'Rain, fog, eclipse effects on moons.'],
    ['company-store-upgrades', 'Company Store Upgrades', 'ship', 'Ship upgrade priority for profit runs.'],
    ['co-op-role-assignments', 'Co-op Role Assignments', 'multiplayer', 'Scout, guard, loot hauler roles.'],
    ['profit-quota-calculator', 'Profit Quota Calculator Tips', 'economy', 'Meet quota early and stack bonuses.'],
    ['turret-and-trap-handling', 'Turret and Trap Handling', 'hazards', 'Disable turrets, landmines, and pitfalls.'],
    ['challenge-moon-strategies', 'Challenge Moon Strategies', 'endgame', 'Adamance, Titan, and modded moon tips.'],
  ],
  'red-dead-redemption-2': [
    ['beginner-guide-open-world', 'Beginner Guide: Open World Tips', 'beginner', 'Camp, honor, Dead Eye fundamentals.'],
    ['best-guns-early', 'Best Guns Early', 'weapons', 'Lancaster, Volcanic, and Chapter 2 loadout.'],
    ['money-honor-tips', 'Money and Honor Tips', 'tips', 'Pelts, treasure maps, and honor management.'],
    ['legendary-animals-hunting', 'Legendary Animals Hunting', 'hunting', 'Track legendaries for trappers and gear.'],
    ['horse-bonding-guide', 'Horse Bonding Guide', 'horses', 'Best horses, bonding level 4, and care.'],
    ['camp-upgrades-priority', 'Camp Upgrades Priority', 'camp', 'Ledger, fast travel map, and morale.'],
    ['dead-eye-progression', 'Dead Eye Progression Guide', 'combat', 'Upgrade Dead Eye and ability cards.'],
    ['side-quest-highlights', 'Side Quest Highlights', 'quests', 'High-reward stranger missions without spoilers.'],
    ['online-mode-basics', 'Red Dead Online Basics', 'online', 'Gold, roles, and starter grind tips.'],
    ['treasure-hunter-maps', 'Treasure Hunter Maps Guide', 'loot', 'Jack Hall, High Stakes, and Poisonous Trail.'],
    ['fishing-survivalist', 'Fishing and Survivalist Challenges', 'challenges', 'Complete survivalist and fishing lists.'],
    ['chapter-6-prep-guide', 'Late Game Chapter Prep', 'story', 'Stock provisions and gear before finale chapters.'],
  ],
  'counter-strike-2': [
    ['beginner-guide-aim-training', 'Beginner Guide: Aim and Fundamentals', 'beginner', 'Crosshair placement, economy, spray control.'],
    ['best-settings-2026', 'Best Settings for Performance 2026', 'settings', 'Video, sensitivity, and audio settings.'],
    ['dust2-callouts-guide', 'Dust2 Callouts Guide', 'maps', 'Essential Dust2 positions and comms.'],
    ['mirage-callouts-guide', 'Mirage Callouts Guide', 'maps', 'Mirage map control and site executes.'],
    ['inferno-tactics-guide', 'Inferno Tactics Guide', 'maps', 'Banana control, apartments, and retakes.'],
    ['economy-round-guide', 'Economy Round Guide', 'economy', 'Full buy, force, eco, and anti-eco rounds.'],
    ['utility-grenade-lineups', 'Utility Grenade Lineups', 'utility', 'Smoke, flash, and molly lineups basics.'],
    ['awp-positioning-tips', 'AWP Positioning Tips', 'weapons', 'Angles, off-angles, and rotation timing.'],
    ['premier-ranking-guide', 'Premier Ranking Guide', 'ranked', 'CS Rating system and climb tips.'],
    ['demo-review-workflow', 'Demo Review Workflow', 'improvement', 'Analyze deaths and positioning from demos.'],
    ['team-roles-igl-calls', 'Team Roles and IGL Calls', 'team', 'Entry, lurk, anchor roles and basic strats.'],
    ['anti-cheat-prime-status', 'Prime Status and Matchmaking', 'account', 'Prime benefits and trust factor basics.'],
  ],
  'sons-of-the-forest': [
    ['beginner-guide-survival', 'Beginner Guide: Survival Basics', 'beginner', 'Kelvin, shelter, food, first-week plan.'],
    ['base-building-guide', 'Base Building Guide', 'base', 'Log forts, traps, and printer placement.'],
    ['best-weapons-crafting', 'Best Weapons and Crafting', 'weapons', 'Bow to railgun progression.'],
    ['kelvin-commands-full', 'Kelvin Commands Full List', 'kelvin', 'Every Kelvin command and automation tips.'],
    ['virginia-companion-guide', 'Virginia Companion Guide', 'companion', 'Befriend Virginia and gear her up.'],
    ['cave-exploration-order', 'Cave Exploration Order', 'caves', 'Cave difficulty order and loot tiers.'],
    ['mutant-patrol-patterns', 'Mutant Patrol Patterns', 'enemies', 'Avoid and fight mutants effectively.'],
    ['seasonal-survival-winter', 'Seasonal Survival Guide', 'survival', 'Cold weather, food storage, and clothing.'],
    ['3d-printer-priority', '3D Printer Priority List', 'crafting', 'Best printable items first.'],
    ['multiplayer-coop-roles', 'Multiplayer Co-op Roles', 'multiplayer', 'Builder, fighter, explorer split.'],
    ['story-lore-clues', 'Story and Lore Clues Guide', 'story', 'Find story items without full spoilers.'],
    ['endgame-boss-preparation', 'Endgame Boss Preparation', 'boss', 'Final cave gear checklist.'],
  ],
  satisfactory: [
    ['beginner-guide-tier-0-2', 'Beginner Guide: Tiers 0–2', 'beginner', 'HUB milestones and first factory.'],
    ['optimal-factory-layout', 'Optimal Factory Layout Tips', 'layout', 'Manifold vs balancer, spacing rules.'],
    ['power-generation-guide', 'Power Generation Guide', 'power', 'Biomass to coal to fuel progression.'],
    ['tier-3-4-steel-aluminum', 'Tier 3–4 Steel and Aluminum', 'progression', 'Steel and aluminum production lines.'],
    ['trains-logistics-guide', 'Trains and Logistics Guide', 'logistics', 'Rail networks, stations, and throughput.'],
    ['fluid-pipeline-basics', 'Fluid Pipeline Basics', 'fluids', 'Pumps, head lift, and oil processing.'],
    ['overclock-underclock-guide', 'Overclock and Underclock Guide', 'optimization', 'Power tradeoffs and efficiency.'],
    ['alternate-recipes-picks', 'Best Alternate Recipes', 'recipes', 'Tier A alternate recipe choices.'],
    ['nuclear-power-setup', 'Nuclear Power Setup', 'power', 'Nuclear plant layout and waste handling.'],
    ['sulfur-combat-nodes', 'Sulfur and Combat Node Guide', 'combat', 'Clear hostile nodes for rare resources.'],
    ['blueprint-copy-paste', 'Blueprint Copy Paste Guide', 'building', 'Save and reuse factory modules.'],
    ['endgame-ficsit-milestones', 'Endgame FICSIT Milestones', 'endgame', 'Final phases and launch project prep.'],
  ],
  rust: [
    ['beginner-guide-first-wipe', 'Beginner Guide: First Wipe Survival', 'beginner', 'Spawn, tools, bow, first base.'],
    ['base-building-raid-defense', 'Base Building and Raid Defense', 'base', 'Honeycomb, airlocks, loot splitting.'],
    ['best-weapons-pvp', 'Best Weapons for PvP', 'weapons', 'Bow to AK progression.'],
    ['monument-run-guide', 'Monument Run Guide', 'loot', 'Safe monument runs for scrap and components.'],
    ['recycling-component-farming', 'Recycling Component Farming', 'farming', 'Recycle items for optimal components.'],
    ['electricity-trap-base', 'Electricity and Trap Base', 'traps', 'Turrets, SAM sites, and power setup.'],
    ['team-clan-strategies', 'Team and Clan Strategies', 'team', 'Zerg vs small group tactics.'],
    ['underwater-loot-runs', 'Underwater Loot Runs', 'loot', 'Diving for crates and oil rig prep.'],
    ['horse-vehicle-transport', 'Horse and Vehicle Transport', 'vehicles', 'Horses, minicopters, and boat routes.'],
    ['raid-timing-offline', 'Raid Timing and Offline Defense', 'raiding', 'When to raid and offline protection.'],
    ['workbench-tech-tree', 'Workbench Tech Tree Guide', 'progression', 'WB1 to WB3 unlock order.'],
    ['pvp-aim-sensitivity', 'PvP Aim and Sensitivity Settings', 'settings', 'Recoil control and FOV tips.'],
  ],
  terraria: [
    ['beginner-guide-first-nights', 'Beginner Guide: First Nights', 'beginner', 'House, NPCs, ore progression.'],
    ['best-weapons-pre-hardmode', 'Best Pre-Hardmode Weapons', 'weapons', 'Molten gear and boss drops.'],
    ['boss-order-guide', 'Boss Order Guide', 'boss', 'Recommended pre-Hardmode boss sequence.'],
    ['npc-housing-requirements', 'NPC Housing Requirements', 'npcs', 'Valid rooms and happiness system.'],
    ['mining-hellevator-guide', 'Mining Hellevator Guide', 'mining', 'Dig to underworld safely and fast.'],
    ['hardmode-transition-prep', 'Hardmode Transition Prep', 'hardmode', 'Quarantine corruption, stockpile items.'],
    ['class-setup-melee-ranged', 'Class Setup Melee vs Ranged', 'build', 'Melee, ranged, mage, summoner starters.'],
    ['fishing-quest-rewards', 'Fishing Quest Rewards', 'fishing', 'Angler quests and reward priority.'],
    ['events-invasion-guide', 'Events and Invasion Guide', 'events', 'Goblin army, pirates, solar eclipse prep.'],
    ['plantera-golem-path', 'Plantera to Golem Path', 'endgame', 'Jungle temple and mechanical boss order.'],
    ['wire-mechanisms-traps', 'Wire Mechanisms and Traps', 'building', 'Actuators, teleporters, and farms.'],
    ['master-mode-tips', 'Master Mode Tips', 'hardmode', 'Extra difficulty rewards and survival.'],
  ],
  'ark-survival-ascended': [
    ['beginner-guide-first-days', 'Beginner Guide: First Days', 'beginner', 'Spawn, engrams, first tame.'],
    ['best-tames-early', 'Best Early Tames', 'tames', 'Parasaur, Trike, Raptor order.'],
    ['base-locations-guide', 'Best Base Locations', 'base', 'Hidden Lake, Southern Islets picks.'],
    ['breeding-mutation-guide', 'Breeding and Mutation Guide', 'breeding', 'Stat breeding and mutation stacking.'],
    ['boss-tek-tier-progression', 'Boss Tek Tier Progression', 'boss', 'Alpha bosses and tek unlocks.'],
    ['cave-artifact-routes', 'Cave and Artifact Routes', 'caves', 'Artifact locations for boss summons.'],
    ['farming-resource-nodes', 'Farming Resource Nodes', 'farming', 'Metal, crystal, obsidian routes.'],
    ['tribe-pvp-defense', 'Tribe PvP Defense', 'pvp', 'Turret towers and mesh rules awareness.'],
    ['ocean-exploration-guide', 'Ocean Exploration Guide', 'exploration', 'Underwater caves and mosas tames.'],
    ['flyer-mount-guide', 'Flyer Mount Guide', 'mounts', 'Argentavis, Pteranodon, and wyvern basics.'],
    ['imprint-baby-raising', 'Imprint and Baby Raising', 'breeding', 'Imprint timers and cryopod usage.'],
    ['modded-server-tips', 'Modded Server Tips', 'multiplayer', 'Popular mods and server settings.'],
  ],
  'the-finals': [
    ['beginner-guide-game-modes', 'Beginner Guide: Game Modes and Roles', 'beginner', 'Light, Medium, Heavy class basics.'],
    ['best-loadouts-2026', 'Best Loadouts for 2026', 'loadout', 'Meta weapons and gadgets per class.'],
    ['map-strategies-guide', 'Map Strategies Guide', 'maps', 'Monaco, Seoul, Las Vegas routes.'],
    ['heavy-class-anchor', 'Heavy Class Anchor Guide', 'class', 'LMG anchors and objective holds.'],
    ['light-class-flank', 'Light Class Flank Guide', 'class', 'Flank routes and quick revives.'],
    ['destruction-gadget-combos', 'Destruction Gadget Combos', 'gadgets', 'C4, breach, goo synergies.'],
    ['cashout-third-party', 'Cashout Third Party Guide', 'strategy', 'Time third parties during uploads.'],
    ['ranked-srs-climb', 'Ranked SRS Climb Guide', 'ranked', 'Climb SRS with consistent team play.'],
    ['weapon-ttk-comparison', 'Weapon TTK Comparison', 'weapons', 'Pick weapons by TTK and recoil.'],
    ['movement-parkour-tips', 'Movement and Parkour Tips', 'movement', 'Zipline routes and vertical play.'],
    ['team-comms-calls', 'Team Comms and Calls', 'team', 'Clear comms during cashout phases.'],
    ['seasonal-patch-meta', 'Seasonal Patch Meta Guide', 'meta', 'Track balance patches and gadget changes.'],
  ],
  'dark-souls-iii': [
    ['beginner-guide-first-hours', 'Beginner Guide: First Hours', 'beginner', 'Class pick, i-frames, bonfire route.'],
    ['best-weapons-early', 'Best Early Weapons', 'weapons', 'Long Sword, Claymore, infusion basics.'],
    ['boss-order-tips', 'Boss Order and Tips', 'boss', 'Early game route and optional bosses.'],
    ['pyromancy-miracle-build', 'Pyromancy and Miracle Build', 'build', 'Faith/int pyro cleric starter.'],
    ['poise-hyper-armor-guide', 'Poise and Hyper Armor Guide', 'combat', 'Poise breakpoints and trade hits.'],
    ['covenants-pvp-rewards', 'Covenants and PvP Rewards', 'pvp', 'Join covenants for unique rewards.'],
    ['infusion-emerald-herald', 'Infusion and Stat Scaling', 'gear', 'Raw, refined, sharp infusions explained.'],
    ['estus-shard-location', 'Estus Shard Locations Early', 'exploration', 'Early shard and bone farming.'],
    ['dlc-ashes-ashes-dlc', 'Ashes of Ariandel and Ringed City', 'dlc', 'DLC order and level recommendations.'],
    ['farming-souls-slimes', 'Farming Souls Early', 'farming', 'Safe soul farm spots pre-Cathedral.'],
    ['npc-questlines-order', 'NPC Questlines Order', 'quests', 'Key NPC quests before they fail.'],
    ['ng-plus-cycle-bosses', 'NG+ Cycle and Boss Rush', 'endgame', 'NG+ scaling and challenge runs.'],
  ],
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeBody(gameTitle, title, tag) {
  const topic = title.replace(`${gameTitle} `, '').replace(gameTitle, '').trim();
  return `${topic} in ${gameTitle} is one of the most searched topics right now. This guide breaks down what works in 2026 patches and live metas.

## Quick summary

| Focus | Recommendation |
| --- | --- |
| Priority | Learn fundamentals before optimizing |
| Time investment | 30–60 minutes of focused practice |
| Skill floor | Accessible for new players |
| Payoff | Immediate improvement in matches/runs |

## Core strategies

1. **Learn the system** — Read tooltips, tutorials, and in-game hints before grinding
2. **One improvement at a time** — Master one mechanic before adding complexity
3. **Review failures** — Replay deaths, losses, or wipes to find patterns
4. **Copy proven setups** — Use community-tested builds/loadouts first
5. **Adapt to patches** — Check recent balance notes when something feels off

## Common mistakes

- Skipping tutorial or practice modes
- Chasing advanced tech before basics
- Ignoring team communication in multiplayer
- Over-investing in cosmetic/grind paths early
- Tilt-queueing after bad sessions

## Advanced tips

Once fundamentals are solid, push efficiency:

- Min-max only the stats that matter for your role
- Record gameplay and compare to top players
- Join community Discords for ${tag} discussions
- Run controlled experiments — change one variable per session

## Bottom line

For ${gameTitle}, ${topic.toLowerCase()} rewards consistency over shortcuts. Apply one section per play session and track improvement over a week.`;
}

function makeFaq(gameTitle, title) {
  const short = title.replace(`${gameTitle} `, '');
  return [
    {
      question: `What is the best approach to ${short.toLowerCase()} in ${gameTitle}?`,
      answer: `Start with fundamentals, use proven community setups, and practice one mechanic per session. Most players improve faster with structured repetition than random play.`,
    },
    {
      question: `Is ${short.toLowerCase()} still relevant in 2026?`,
      answer: `Yes. ${gameTitle} receives regular updates and the core principles in this guide apply to current patches. Re-check patch notes after major updates.`,
    },
  ];
}

function escapeYaml(str) {
  return str.replace(/"/g, '\\"');
}

async function getExistingFiles(slug) {
  const dir = join(guidesRoot, slug);
  try {
    const files = await readdir(dir);
    return new Set(files.filter((f) => f.endsWith('.mdx')));
  } catch {
    return new Set();
  }
}

function computePublishedAt(slug, file, topicIndex, totalTopics) {
  const order = {
    'meccha-chameleon': 1, 'path-of-exile-2': 2, 'cyberpunk-2077': 3,
    'dead-by-daylight': 4, 'marvel-rivals': 5, 'forza-horizon-6': 6,
    'baldurs-gate-3': 7, 'elden-ring': 8, palworld: 9, 'helldivers-2': 10,
    'black-myth-wukong': 11, 'hades-ii': 12, 'stardew-valley': 13,
    'monster-hunter-wilds': 14, 'hogwarts-legacy': 15, valheim: 16,
    'lethal-company': 17, 'red-dead-redemption-2': 18, 'counter-strike-2': 19,
    'sons-of-the-forest': 20, satisfactory: 21, rust: 22, terraria: 23,
    'ark-survival-ascended': 24, 'the-finals': 25, 'dark-souls-iii': 26,
  }[slug] ?? 20;
  const DAY_GAPS = [0, 6, 13, 19, 27, 34, 42, 51, 58, 67, 74, 83];
  const anchor = new Date('2026-07-03T12:00:00Z');
  const reverseIndex = totalTopics - 1 - topicIndex;
  const gapIndex = Math.min(reverseIndex, DAY_GAPS.length - 1);
  const daysBefore = DAY_GAPS[gapIndex] + (order - 1) * 3 + ((reverseIndex * 2 + order) % 4);
  const d = new Date(anchor);
  d.setUTCDate(d.getUTCDate() - daysBefore);
  return d.toISOString().slice(0, 10);
}

async function writeGuide(slug, file, title, description, tags, body, faq, topicIndex, totalTopics) {
  const faqYaml = faq
    .map(
      (f) =>
        `  - question: "${escapeYaml(f.question)}"\n    answer: "${escapeYaml(f.answer)}"`,
    )
    .join('\n');
  const tagsYaml = tags.map((t) => `"${t}"`).join(', ');
  const fullTitle = `${GAMES[slug]} ${title}`;

  const publishedAt = computePublishedAt(slug, file, topicIndex, totalTopics);

  const content = `---
title: "${escapeYaml(fullTitle)}"
description: "${escapeYaml(description)}"
game: ${slug}
publishedAt: ${publishedAt}
tags: [${tagsYaml}]
faq:
${faqYaml}
---

${body}
`;

  const dir = join(guidesRoot, slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, file), content, 'utf8');
}

async function main() {
  let created = 0;
  let skipped = 0;
  const report = [];

  for (const [slug, topics] of Object.entries(TOPICS)) {
    const existing = await getExistingFiles(slug);
    let gameCreated = 0;

    for (let i = 0; i < topics.length; i++) {
      const [file, title, tag, desc] = topics[i];
      const filename = file.endsWith('.mdx') ? file : `${file}.mdx`;
      if (existing.has(filename)) {
        skipped++;
        continue;
      }
      const fullTitle = title.startsWith(GAMES[slug]) ? title : title;
      const description = desc.includes(GAMES[slug])
        ? desc
        : `${desc} Updated for ${GAMES[slug]} players in 2026.`;
      const body = makeBody(GAMES[slug], `${GAMES[slug]} ${title}`, tag);
      const faq = makeFaq(GAMES[slug], `${GAMES[slug]} ${title}`);
      await writeGuide(
        slug,
        filename,
        title,
        description,
        [tag, 'guide', '2026'],
        body,
        faq,
        i,
        topics.length,
      );
      existing.add(filename);
      created++;
      gameCreated++;
    }

    const total = existing.size;
    report.push({ slug, total, gameCreated });
  }

  console.log('\n=== Guide Generation Report ===');
  for (const { slug, total, gameCreated } of report) {
    const status = total >= MIN_GUIDES ? 'OK' : 'LOW';
    console.log(`${status} ${slug}: ${total} guides (+${gameCreated} new)`);
  }
  console.log(`\nCreated: ${created}, Skipped existing: ${skipped}`);
  console.log(`Total games: ${report.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
