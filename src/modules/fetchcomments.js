const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const APP_ID = 'MQomAQGD2c0JHxU5tUHT';

const fetchComment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${APP_ID}/comments?item_id=${id}`);
    if (response.ok) {
      const data = response.json();
      return data;
    }
    return [];
  } catch (err) {
    return err;
  }
};

export default fetchComment;