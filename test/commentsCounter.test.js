/** @jest-environment jsdom */
import commentsCounter from '../src/modules/commentsCounter.js';

describe('commentsCounter,', () => {
  document.body.innerHTML = '<span id="c-total"></span>';
  const count = document.getElementById('c-total');
  const comments = [{ username: 's', comment: 'd', creation_date: '2023-02-17' }];
  commentsCounter(comments);
  test('displays the number of comments', () => {
    expect(count.textContent).toBe('1');
  });
});