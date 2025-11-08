# Swell-Health-Response-Rehearsal-Expo-Feature-
A drop‑in Expo feature that fits into Swell’s navigation as a daily, practical micro‑coach for tough conversations. It helps users rehearse responses to stressful messages (work, relationships) using science‑backed patterns (I‑statements, boundary setting, curiosity), saves chosen drafts to a personal Playbook, and builds a streak via quick daily reps.
# Swell — Response Rehearsal (Expo Feature)


> A practical, daily feature for Swell that turns "hard messages" into teachable micro‑reps. Paste a message, pick a skill (boundary, I‑statement, curiosity), get 3 structured rewrites, save your favorite to your Playbook, and keep a streak.


## Why
Most growth apps feel like chores. This is a **do‑it‑now** tool you’ll open when it matters: right before replying to someone.


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
npx create-expo-app -y # if you want, but this repo is ready


# clone this repo
npm install
npm run start
