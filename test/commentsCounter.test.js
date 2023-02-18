/** @jest-environment jsdom */
import commentsCounter from '../src/modules/commentsCounter.js';

describe('commentsCounter,', () => {
  test('displays 0 when there are no comments', () => {
    document.body.innerHTML = '<span id="c-total"></span>';
    const count = document.getElementById('c-total');
    const comments = [];
    commentsCounter(comments);
    expect(count.textContent).toBe('0');
  });

  test('displays 0 when there are no comments', () => {
    document.body.innerHTML = '<span id="c-total"></span>';
    const count = document.getElementById('c-total');
    const comments = [{}];
    commentsCounter(comments);
    expect(count.textContent).toBe('1');
  });
});