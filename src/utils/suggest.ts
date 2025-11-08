import { Prefs } from '../storage';

type Suggestion = { title: string; body: string; rationale: string };

function toneWrap(text: string, tone: Prefs['tone']) {
  if (tone === 'warm') return text.replace(/\.$/, ', okay?');
  if (tone === 'direct') return text.replace(/\.$/, '.');
  return text;
}

export function suggestRewrites(input: string, skill: string, prefs: Prefs): Suggestion[] {
  const base = input.trim();
  const s: Suggestion[] = [];
  if (skill === 'i_statement') {
    s.push({
      title: 'Impact + Request',
      body: toneWrap(`I felt stressed reading this and need a beat to respond clearly. I'll get back to you by 3pm.`, prefs.tone),
      rationale: 'Names feeling, sets expectation.'
    });
    s.push({
      title: 'Own the Need',
      body: toneWrap(`I want to get this right. I'm going to step away for 20 minutes and then follow up.`, prefs.tone),
      rationale: 'Owns desire to respond well.'
    });
    s.push({
      title: 'Acknowledge + Plan',
      body: toneWrap(`I hear the urgency. I need a moment to gather details; I'll send an update shortly.`, prefs.tone),
      rationale: 'Balances validation with self‑regulation.'
    });
  } else if (skill === 'boundary') {
    s.push({
      title: 'Limit + Alternative',
      body: toneWrap(`I can't make changes after 6pm. If it's urgent, please flag by noon and I'll prioritize.`, prefs.tone),
      rationale: 'Time boundary with workflow alternative.'
    });
    s.push({
      title: 'Scope Guardrail',
      body: toneWrap(`I can handle A today; B will need to wait until tomorrow.`, prefs.tone),
      rationale: 'Protects focus without stonewalling.'
    });
    s.push({
      title: 'Consequence',
      body: toneWrap(`If edits come in after the deadline, they'll roll to next sprint.`, prefs.tone),
      rationale: 'States what happens next.'
    });
  } else {
    s.push({
      title: 'Open the Door',
      body: toneWrap(`Can you say more about what feels most urgent here?`, prefs.tone),
      rationale: 'Invites specifics, reduces heat.'
    });
    s.push({
      title: 'Reflect + Ask',
      body: toneWrap(`Sounds like timing is tight. What would "good enough for now" look like?`, prefs.tone),
      rationale: 'Reflects, then narrows.'
    });
    s.push({
      title: 'Assume Good Intent',
      body: toneWrap(`I might be missing context. What led to this request?`, prefs.tone),
      rationale: 'Curiosity over defensiveness.'
    });
  }
  // Preference reordering could happen here later
  return s;
}

