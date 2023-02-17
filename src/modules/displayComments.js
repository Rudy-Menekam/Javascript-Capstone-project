import commentsCounter from "./commentscounter";
import fetchComment from "./fetchcomments";

const displayComments = async (id) => {
  const comments = await fetchComment(id);
  console.log(comments)
  commentsCounter(comments);
  comments.forEach((c) => {
    document.getElementById('all-comments').innerHTML += `<li>${c.creation_date} ${c.username}: ${c.comment}</li>`;
  });
}
export default displayComments;