import './style.css';
import fetchLikes from './modules/fetchLikes.js';
import addLikes from './modules/addLikes.js';
import mealCount from './modules/mealCount.js';

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
  await fetch(`${BASE_URL}/${APP_ID}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
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
    <ul id="horiz-name">
      <li>${meal.strMeal}</li>
      <li>${meal.strCategory}</li>
      <li>${meal.strArea}</li>
     </ul>
     <h3 id="c-count">Comments(<span class="total"></span>)</h3>
    <ul id="all-comments"></ul>
  <form id="comment-form">
  <h3>Add a comments</h3>
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
    const date = Date().split(' ').splice(1, 3).join(' ')
      .split(' ')
      .reverse();
    const month = ('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(date.slice(2).join('')) / 3 + 1);
    // eslint-disable-next-line camelcase
    const item_id = meal.idMeal;

    if (username && comment) {
      document.getElementById('all-comments').innerHTML += `<li>${date[0].concat(`-0${month}-${date[1]}`)} ${username}: ${comment}</li>`;
      postComment({ item_id, username, comment });
      document.queryselector('form').reset();
    }
  });

  const comments = await fetchComment(meal.idMeal);
  comments.forEach((c) => {
    document.getElementById('all-comments').innerHTML += `<li>${c.creation_date} ${c.username}: ${c.comment}</li>`;
  });
};

const mealsSection = document.getElementById('meals');

const showMeals = async (meals) => {
  const likes = await fetchLikes();

  if (!meals) {
    document.querySelector('.foods-no').textContent = 'All foods(0)';
    mealsSection.innerHTML = '<p>No meals available starting with that letter</p>';
    return;
  }
  meals.forEach((meal) => {
    const like = likes.find((l) => l.item_id === meal.idMeal);

    const div = document.createElement('div');
    div.innerHTML = `
  	<div class="meal">
    	<div class="meal-image" style="background-image: url(${meal.strMealThumb});">
    	</div>
    	<div class="meal-details">
      	<p class="meal-name">${meal.strMeal}</p>
      	<p class="likes">
        	<i class="bi bi-heart-fill" id="l${meal.idMeal}" type="button"></i>
        	<span class="likes-count">${like ? like.likes : 0}</span> Likes
      	</p>
    	</div>
    	<div class="involvement">
      	<button type="button" id="${meal.idMeal}" class="comments">Comments</button>
    	</div>
  	</div>`;
    mealsSection.append(div);
    document.getElementById(`${meal.idMeal}`).addEventListener('click', () => {
      commentsPopup(meal);
    });

    document.getElementById(`l${meal.idMeal}`).addEventListener('click', () => {
      addLikes({ item_id: meal.idMeal });
      let num = +document.getElementById(`l${meal.idMeal}`).nextSibling.nextSibling.textContent;
      num += 1;
      document.getElementById(`l${meal.idMeal}`).nextSibling.nextSibling.textContent = num;
    });
  });

  const num = document.querySelector('.total');
  const wrapper = document.querySelector('#meals');
  mealCount(wrapper, num);
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