import { $ } from '../dom-helpers.js';
import { wait } from '../dom-helpers.js';
import { resetAll } from '../reset.js';

export async function runStepLoop(stepNum, setupFn, runFn) {
  const cursor = $('cursor');
  const frame = document.querySelector('.mockup-frame');
  const indicator = $('step-indicator');

  // Initial setup
  resetAll(cursor);
  setupFn(cursor);

  // Run the animation
  await runFn(cursor);

  // Fade out
  frame.style.opacity = '0';
  frame.style.transform = 'scale(0.97)';
  if (indicator) indicator.style.opacity = '0';
  await wait(1500);

  // Reset without transition
  frame.style.transition = 'none';
  if (indicator) indicator.style.transition = 'none';
  frame.style.opacity = '0';
  frame.style.transform = 'scale(0.97)';
  if (indicator) indicator.style.opacity = '0';

  resetAll(cursor);
  setupFn(cursor);
  await wait(100);

  // Fade back in
  frame.style.transition = 'opacity 1s ease, transform 1s ease';
  if (indicator) indicator.style.transition = 'opacity 1s ease';
  frame.style.opacity = '1';
  frame.style.transform = 'scale(1)';
  if (indicator) indicator.style.opacity = '1';
  await wait(600);

  // Loop
  runStepLoop(stepNum, setupFn, runFn);
}
