/**
 * Pause the execution flow for given millisecond. Must be called inside async function 
 * usage example) 
 * async function showFailSequence() {
 *  Answers.markCorrect();
 *  flashWarning();
 *  await animate(
 *    '.hud__life',
 *    'animate__animated animate__shakeX animate__fast'
 *  );
 *  await sleep(1000);
}

 * @param {number} ms number of millisecond to sleep for
 * @returns {Promise}
 */
export default async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
