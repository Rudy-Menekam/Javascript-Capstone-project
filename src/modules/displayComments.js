import commentsCounter from './commentsCounter.js';
import fetchComment from './fetchcomments.js';

const displayComments = async (id) => {
  const comments = await fetchComment(id);
  commentsCounter(comments);
  comments.forEach((c) => {
    document.getElementById('all-comments').innerHTML += `<li>${c.creation_date} ${c.username}: ${c.comment}</li>`;
  });
};
export default displayComments;