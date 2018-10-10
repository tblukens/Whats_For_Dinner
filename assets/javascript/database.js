$(document).ready(function () {

  // Initialize Firebase's Realtime Database JavaScript SDK
  var config = {
    apiKey: "AIzaSyD9fyj4PKdPdYQOFbya1qI9r1B0oi5fBPo",
    authDomain: "what-s-for-dinner-1c1a8.firebaseapp.com",
    databaseURL: "https://what-s-for-dinner-1c1a8.firebaseio.com",
    projectId: "what-s-for-dinner-1c1a8",
    storageBucket: "",
    messagingSenderId: "627573806356"
  };
  firebase.initializeApp(config);

  // Variable to hold the reference of the database
  database = firebase.database();

  // Initial values 
  var chosenRecipe = "";

  var currentUser;

  $(document).on("click", ".saveBtn", function (e) {
    e.preventDefault();

    if (username !== "") {
      currentUser = username

    } else {
      currentUser = 'default';
      recipeList = [];
      // Model to alert the user to submit a name
      $("#alert-username").addClass("is-active");
      return false;
    }

    // Select a global variable recipeArr (from edamam.js file)
    chosenRecipe = recipeArr[$(this).data("id")];
    // Add the chosen recipe to a 'saved recipes list
    recipeList.push(chosenRecipe);
    // Add the save recipes to database

    database.ref("/users/").child(currentUser).set({
      'chosenRecipe': recipeList
    });

    database.ref("/users/").child(currentUser).on("child_added", function (snapshot) {
      console.log(snapshot.val());

      // Clear saved recipes area
      $("#saved-recipe").empty();

      // Create a card for each item in saved recipes
      var savedRecipesArr = snapshot.val();
      for (var i = 0; i < savedRecipesArr.length; i++) {

        /* savedCardRecipes = '<div class="tile is-parent">' +
          '<article class="tile is-child box">' +
          '<div class="card" is-one-third>' +
          '<div class="card-image" is-1by5>' +
          '<figure class="image is-square">' +
          '<img class="recipe-image" src="' + savedRecipesArr[i].image + '" alt="Placeholder image" is-1by5>' +
          '</figure>' +
          '</div>' +
          '<div class="card-content">' +
          '<div class="content">' +
          '<h3 class="title">' + savedRecipesArr[i].title + '</h3>' +
          '<p class="calories">' + savedRecipesArr[i].caloriesPer + ' calories per serving.</p><p> Servings: ' + savedRecipesArr[i].servings + '</p>' +
          '<br>' +
          '<p class="recipe-link subtitle"><a class="recipe-link" href="' + savedRecipesArr[i].url + '" target="_blank">Get the Recipe</a></p>' +
          '</div>' +
          '</div>' +
          '<footer class="card-footer">' +
          '<a class="button is-primary card-footer-item show-recipe-modal plannerBtn" data-id=' + i + '>Add to Planner</a>' +
          '<a class="button is-outlined card-footer-item remove-saved-recipes"><i class="far fa-trash-alt"></i></a>' +
          '</footer>' +
          '</div>' +

          '</article>' +
          '</div>'; */

          saveMediaRecipes = '<article class="card saved-recipes-card media">' +
          '<figure class="media-left">' +
          '<p class="image is-64x64">' +
          '<img src="' + savedRecipesArr[i].image + '">' +
          '</p>' +
          '</figure>' +
          ' <div class="media-content">' +
          ' <div class="content">' +
          '<p>' +
          '<strong>' + savedRecipesArr[i].title+ '</strong> <small>' + savedRecipesArr[i].caloriesPer +' calories per serving. </small>'  + '<small>Servings: ' + savedRecipesArr[i].servings + '</small>' +
          '<br>' + 
          '' +
          '</p>' + 
          '</div>' +
          '<nav class="level is-mobile">' +
          '<div class="level-left">' +
          '<a class="level-item button is-primary card-footer-item show-recipe-modal plannerBtn" data-id=' + i + '>Add to Planner</a>' +
          '<a class="level-item button is-primary is-outlined card-footer-item recipe-link" target="_blank" href="' + savedRecipesArr[i].url + '"data-id=' + i + '>Get the Recipe</a>' +
          '</div>' +
          '</nav>' +
          '</div>' +
          '<div class="media-right">' +
          '<button class="remove-saved-recipes delete" data-id=' + i + '></button>' +
          '</div>' +
          '</article>'
         

        $("#saved-recipe").append(saveMediaRecipes);
      }
    });
  });

  $(document).on("click", ".remove-saved-recipes", function (e) {
    e.preventDefault();
    console.log(this);
    console.log($(this).attr('data-id'));
    var recipeToRemove = $(this).attr('data-id');
    database.ref("/users/").child(currentUser).child(recipeToRemove).remove();
  });
});