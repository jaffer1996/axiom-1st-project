const search = document.getElementById('search');
const form = document.getElementById('submit');
const generatebtn = document.getElementById('generate');
const resultsheading = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const selectedmeal = document.getElementById('selected-meal');

function searchmeal(e) {
    e.preventDefault();

    const searchtext = search.value;
    
    if (searchtext.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtext}`)
        .then(res => res.json())
        .then(data => {
            resultsheading.innerHTML = `<h3>Search results for ${searchtext}</h3>`;

            if (data.meals === null) {
                resultsheading.innerHTML = `<h3>No results found for ${searchtext}</h3>`;
            } else {
                meals.innerHTML = data.meals.map( meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `).join('');
            }
        });
        search.value = '';
    } else {
        alert('please enter search keyword')
    }

    selectedmeal.innerHTML = '';
};

function Getdetailsofmeals(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const mealdata = data.meals[0];
        displaymealdetails(mealdata);
    });
}

function displaymealdetails(mealdata) {
    meals.innerHTML = '';
    resultsheading.innerHTML = '';
    const ingredients = [];
    for (let index = 1; index <= 20; index++) {
        if ( mealdata[`strIngredient${index}`]){
            ingredients.push(`${mealdata[`strIngredient${index}`]} : ${mealdata[`strMeasure${index}`]}`);
        } else {
            break;
        }
    }

    selectedmeal.innerHTML = `
        <div class="selected-meal-details">
            <h3>${mealdata.strMeal}</h3>
            <img src="${mealdata.strMealThumb}" alt="${mealdata.strMeal}"/>
            <div class="selected-meal-info">
                ${mealdata.strCategory ? `<p>${mealdata.strCategory}</p>` : ''}
                ${mealdata.strArea ? `<p>${mealdata.strArea}</p>` : ''}
            </div>
            <div class="selected-meal-instructions">
                <p>${mealdata.strInstructions}</p>
                <h3>Ingredients</h3>
                <ul>
                    ${ingredients.map(item => `<li>${item}</li>` ).join('')}
                </ul>
            </div>
        </div>
    `;
}

form.addEventListener('submit', searchmeal);

meals.addEventListener('click', e => {
    const mealinfo = e.path.find(item => {
        if ( item.classList ) {
            return item.classList.contains('meal-info');
        } else {
            return false; 
        }
    })

    if (mealinfo) {
        const mealID = mealinfo.getAttribute('data-mealID');
        Getdetailsofmeals(mealID);
    }
})

generatebtn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        Getdetailsofmeals(data.meals[0].idMeal);
    })
})