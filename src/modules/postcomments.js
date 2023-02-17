const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const APP_ID = 'MQomAQGD2c0JHxU5tUHT';

const postComment = async (comment) => {
  await fetch(`${BASE_URL}/${APP_ID}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
};

export default postComment;