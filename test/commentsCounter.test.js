/** @jest-environment jsdom */
import commentsCounter from '../src/modules/commentsCounter.js';

describe('commentsCounter,', () => {
  document.body.innerHTML = '<span id="c-total"></span>';
  const count = document.getElementById('c-total');
  const comments = [];
  commentsCounter(comments);
  test('displays 0 when there are no comments', () => {
    expect(count.textContent).toBe('0');
  });
});