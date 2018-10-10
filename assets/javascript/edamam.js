var recipeArr = [];
var saveToPlanner = [];
var randomRecipe = ["Slow Cooker Pot Roast", "Asian Chicken Skillet", "Easy Pulled Pork", "Shrimp Scampi", "One-Pot Chili", "Enchiladas", "Chicken Alfredo", "Coconut Breaded Shrimp", "Macaroni and Cheese", "Broccoli Chicken Teriyaki", "Turkey Meatballs"];
var searchTerm = "";
$(document).ready(function () {
    var searchFunction = function (searchTerm) {

        $("#display-recipe").empty();
        recipeArr = [];

        console.log($("#find-recipe").val().trim())
        // if ($("#find-recipe").val().trim() !== "") {
        //     searchTerm = $("#find-recipe").val().trim();
        // }

        queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + app_id + "&app_key=" + api_key;
        $.ajax({
            type: "GET",
            url: queryURL,
            success: function (response) {
                console.log(response)
                response.hits.forEach(function (element, i) {
                    console.log(element)
                    var recipe = element.recipe;
                    var calories = Math.floor(recipe.calories / recipe.yield);
                    console.log(calories)
                    var addRecipe = '<div class="tile is-parent">' +
                        '<article class="tile is-child box">' +
                        // '<!-- 1st Column -->'
                        '<div class="card">' +
                        //   '<!-- Start Recipe Card -->''
                        '<div class="card-image">' +
                        '<figure class="image is-square">' +
                        '<img class="recipe-image" src="' + recipe.image + '" alt="Placeholder image">' +
                        '</figure>' +
                        '</div>' +
                        '<div class="card-content">' +
                        '<div class="content">' +
                        '<h3 class="title">' + recipe.label + '</h3>' +
                        '<p class="calories">' + calories + ' calories per serving.</p><p> Servings: ' + recipe.yield + '</p>' +
                        '<p class="ingredients">' +
                        '<a class="ingredients is-link" data-id=' + i + '>' + recipe.ingredients.length + ' Ingredients</span></p>' +
                        '<br>' +
                        '<p class="subtitle"><a href="' + recipe.url + '" target="_blank">Get the Recipe</a></p>' +
                        '</div>' +
                        '</div>' +
                        '<footer class="card-footer">' +
                        '<a class="button is-primary show-recipe-modal card-footer-item plannerBtn" data-id=' + i + '>Add to Planner</a>' +
                        '<a class="button is-primary is-outlined card-footer-item saveBtn" data-id=' + i + '>Save</a>' +
                        '</footer>' +
                        '</div>' +
                        // {/* '<!-- End Recipe Card -->' */}
                        '</article>' +
                        '</div>';
                    $("#display-recipe").append(addRecipe);
                    var ingredientsArr = [];
                    recipe.ingredients.forEach(element => {
                        // console.log(element.text)
                        ingredientsArr.push(element.text)
                    });
                    var recipeDBinfo = {
                        "image": recipe.image,
                        "title": recipe.label,
                        "caloriesPer": calories,
                        "servings": recipe.yield,
                        "numIngredients": recipe.ingredients.length,
                        "ingredients": ingredientsArr,
                        "url": recipe.url
                    }
                    recipeArrFunc(recipeDBinfo);
                });
            }
        });
        $("#find-recipe").val("");
    }


    app_id = "2e6d0cdb";
    api_key = "d51c1fc90751f8b5326558e771428dbd";

    $("#search-recipe").on("click", function (e) {
        if ($("#find-recipe").val() !== "") {
            searchTerm = $("#find-recipe").val().trim();
            searchFunction(searchTerm);
        } else {
            return false;
        }
    });

    $("#find-recipe").keypress(function (e) {
        if (e.which == 13) {
            $("#search-recipe").click();
        }
    });
    var recipeArrFunc = function (recipe) {
        recipeArr.push(recipe);
        console.log(recipeArr)
    }

    $("#show-recipe-title").text("Choose day of the week to save meal to:")
    $("#show-recipe-body").html('<div class="control has-icons-left">' +
        '    <div class="select">' +
        '   <select name="dayOfWeek" id="dayOfWeek">' +
        '   <option selected>Days of the week</option>' +
        '    <option value="mon">Monday</option>' +
        '    <option value="tue">Tuesday</option>' +
        '    <option value="wed">Wednesday</option>' +
        '    <option value="thu">Thursday</option>' +
        '    <option value="fri">Friday</option>' +
        '    <option value="sat">Saturday</option>' +
        '    <option value="sun">Sunday</option>' +
        '   </select>' +
        '   </div>' +
        '   <span class="icon is-left">' +
        '   <i class="far fa-calendar-alt"></i>' +
        '   </span>' +
        '   </div>'
        );

    $('.show-recipe-footer').click(function () {
        console.log(addMealNum)
        var dayOfWeek = $("#dayOfWeek").val();
        var addedMeal = recipeArr[addMealNum];
        console.log(addedMeal)
        console.log(dayOfWeek + "-recipe")
        $("#" + dayOfWeek + "-recipe").html('<a class="recipeLink is-link" href="' + addedMeal.url + '" target="_blank">' + addedMeal.title + '</a>');
        $("#" + dayOfWeek + "-calories").text(addedMeal.caloriesPer);
        $("#" + dayOfWeek + "-serving").text(addedMeal.servings);
        var ingredientsLink = '<a class="ingredients is-link" data-id='+addMealNum+'>'+addedMeal.numIngredients+'</a>';
        $("#" + dayOfWeek + "-ingredients").html(ingredientsLink);

        $(".modal").removeClass("is-active");
    })
    $(document).on("click", ".quickPicks", function () {
        console.log($(this).data("id"))
        searchTerm = $(this).data("id");
        searchFunction(searchTerm)

    });
    $("#search-random-recipe").click(function () {
        var randomNum = Math.floor(Math.random() * (randomRecipe.length));
        searchTerm = randomRecipe[randomNum];
        console.log(searchTerm)
        searchFunction(searchTerm);
    });

    $(document).on("click", "a.ingredients", function () {

        $("#show-ingredients-body").empty();
        $("#show-ingredients-footer").empty();
        ingredientsNum = $(this).data("id");
        $("#show-ingredients-body").html('<h4 class="ingredients-list-title">' + '<i class="fas fa-utensils"></i> ' + recipeArr[ingredientsNum].title + '</h4>' + '<hr>');
        modalIngredients = recipeArr[ingredientsNum].ingredients;
        modalIngredients.forEach(element => {
            ingredientsP = $("<p>");
            ingredientsP.text(element);

            $("#show-ingredients-body").append(ingredientsP);
        });
        $("#show-ingredients-title").text('Ingredients List');
        $("#show-ingredients").addClass("is-active");
    })

});