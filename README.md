# Swell — Response Rehearsal (Expo Feature)

> A practical, daily feature for Swell that turns "hard messages" into teachable micro‑reps. Paste a message, pick a skill (boundary, I‑statement, curiosity), get 3 structured rewrites, save your favorite to your Playbook, and keep a streak.

## Why

Most growth apps feel like chores. This is a **do‑it‑now** tool you'll open when it matters: right before replying to someone.

## Outcomes

- **Daily stickiness:** 60‑second Daily Rep + streak.
- **Behavior transfer:** Structured rewrites aligned to skills.
- **Delight:** Small progress bar, playful copy, frictionless save.

## Tech

- Expo (React Native, TypeScript)
- React Navigation (Bottom Tabs + Stack)
- AsyncStorage for mock persistence
- No backend required; mock skill engines in `src/utils/suggest.ts`

## Quick Start

```bash
# Node 18+, Expo CLI recommended
npx create-expo-app -y  # if you want, but this repo is ready

# clone this repo
npm install
npm run start
npx expo start --web

```

Press `i` for iOS Simulator or `a` for Android Emulator.

## Navigation fit

* Adds a **Coach** tab with:

  * **Home** (entry, streak, last win)

  * **Daily Rep** (quick prompt -> suggestion flow)

  * **Playbook** (saved responses, tagged by skill)

  * **Settings** (skill focus, copy tone)

This can be integrated into Swell's existing Nav by nesting the Coach tab inside the app's main TabNavigator.

## Loom Walkthrough (script)

1. *Problem:* People open Swell when stressed, drop off later. We need a reason to open daily.

2. *Idea:* Response Rehearsal — a 60‑second tool to craft better replies.

3. *Flow:* Home → Daily Rep → Paste a message → Pick a skill → Review 3 rewrites → Save to Playbook → small confetti + streak.

4. *Why it works:* Real messages, real stakes, micro‑wins. No fluff.

5. *Data:* We log which skill and rewrite pattern the user prefers (mocked). Over time, adapt suggestions to user style.

6. *Next steps:* Swap mock suggestors for server‑side AI; add keyboard extensions / share sheet.

## Roadmap

* Share Sheet: Send from Messages/Slack → open ComposeScreen with prefilled text.

* Skill Plans: Weekly focus (e.g., "Boundaries Week"), rep goals, gentle nudges.

* SMS Widget (opt‑in): detect heated phrasing → suggest curiosity rewrite.

## License

MIT
