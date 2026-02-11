import { $ } from './dom-helpers.js';
import { wait } from './dom-helpers.js';
import { resetAll } from './reset.js';

import { runStep1 } from './steps/step1.js';
import { runStep2 } from './steps/step2.js';
import { runStep3 } from './steps/step3.js';
import { runStep4 } from './steps/step4.js';
import { runStep5 } from './steps/step5.js';
import { runStep6 } from './steps/step6.js';
import { runStep7 } from './steps/step7.js';

export async function runAnimation() {
  const cursor = $('cursor');

  resetAll(cursor);

  await runStep1(cursor);
  await runStep2(cursor);
  await runStep3(cursor);
  await runStep4(cursor);
  await runStep5(cursor);
  await runStep6(cursor);
  await runStep7(cursor);

  // Fade out the whole mockup
  var frame = document.querySelector('.mockup-frame');
  var indicator = $('step-indicator');
  frame.style.opacity = '0';
  frame.style.transform = 'scale(0.97)';
  indicator.style.opacity = '0';
  await wait(1500);

  // Reset and fade back in
  frame.style.transition = 'none';
  indicator.style.transition = 'none';
  frame.style.opacity = '0';
  frame.style.transform = 'scale(0.97)';
  indicator.style.opacity = '0';

  resetAll(cursor);
  await wait(100);

  frame.style.transition = 'opacity 1s ease, transform 1s ease';
  indicator.style.transition = 'opacity 1s ease';
  frame.style.opacity = '1';
  frame.style.transform = 'scale(1)';
  indicator.style.opacity = '1';
  await wait(600);

  runAnimation();
}
