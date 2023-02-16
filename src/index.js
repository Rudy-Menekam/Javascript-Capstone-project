import './style.css';


const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const APP_ID = 'MQomAQGD2c0JHxU5tUHT';


const fetchMeals = async (l) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    return err;
  }
};


const postComment = async (comment) => {
  try {
    await fetch(`${BASE_URL}/${APP_ID}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
  } catch (err) {
    return err;
  }
};


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


const links = document.getElementById('links');


const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


alphabet.split('').forEach((a) => {
  links.innerHTML += ` <button type="button" id="${a}">${a}</button>`;
});


const commentsPopup = async (meal) => {
  const main = document.querySelector('main');
  const popupDiv = document.createElement('div');
  popupDiv.setAttribute('class', 'popup');


  popupDiv.innerHTML = `
  <button type="button" id="close">&times;</button>
  <div class="popup-image" style="background-image: url(${meal.strMealThumb});"></div>
    <ul>
      <li>${meal.strMeal}</li>
      <li>${meal.strCategory}</li>
      <li>${meal.strArea}</li>
     </ul>
    <ul id="all-comments"></ul>
  <form id="comment-form">
    <input type="text" id="username" placeholder="username" name="username" required>
    <textarea name="comment" id="comment" placeholder="Enter your comment..." cols="30" rows="4" required></textarea>
    <button type="button" id="post-comment">Comment</button>
  </form>`;
  main.append(popupDiv);


  document.getElementById('close').addEventListener('click', () => {
    main.removeChild(popupDiv);
  });


  document.getElementById('post-comment').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const comment = document.getElementById('comment').value.trim();
    // eslint-disable-next-line camelcase
    const item_id = meal.idMeal;
    if (username && comment) {
      postComment({ item_id, username, comment });
    }
  });


  const comments = await fetchComment(meal.idMeal);
  comments.forEach((c) => {
    document.getElementById('all-comments').innerHTML += `<li>${c.creation_date} ${c.username}: ${c.comment}</li>`;
  });
};


const mealsSection = document.getElementById('meals');


const showMeals = (meals) => {
  if (!meals) {
    mealsSection.innerHTML = '<p>No meals available starting with that letter</p>';
    return;
  }
  meals.forEach((meal) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="meal">
        <div class="meal-image" style="background-image: url(${meal.strMealThumb});">
          <p class="meal-name">${meal.strMeal}</p>
        </div>
        <div class="involvement">
          <p class="likes">
           <i class="bi bi-heart-fill" type="button"></i>
           <span class="likes-count"></span>
          </p>
          <button type="button" id="${meal.idMeal}" class="comments">Comments</button>
        </div>
      </div>`;
    mealsSection.append(div);
    document.getElementById(`${meal.idMeal}`).addEventListener('click', (e) => {
      commentsPopup(meal);
    });
  });
};


const displayMeals = async () => {
  let letter = 's';
  const meals = await fetchMeals(letter);
  showMeals(meals);
  document.querySelectorAll('#links button').forEach((l) => {
    l.addEventListener('click', async (e) => {
      document.getElementById('meals').innerHTML = '';
      letter = e.target.id;
      const meals = await fetchMeals(letter);
      showMeals(meals);
    });
  });
};


displayMeals();