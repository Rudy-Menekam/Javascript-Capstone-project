const commentsCounter = (comments) => {
  document.getElementById('c-total').textContent = comments.length;
};

export default commentsCounter;