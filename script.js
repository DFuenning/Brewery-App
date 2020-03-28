//Onclick that takes the city name input and uses it in citySearch function
$("#select-city").on("click", function(event) {
    
    event.preventDefault();
    var city = $("#city-input").val().trim();
    console.log(city)
    citySearch(city);
});
 //Uses city from input to call API and returns results to screen
function citySearch(city) {
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        //For loop to run through all responses
        for (i = 0; i < response.length; i++) {
        
        //Creates a cardbody and div to hold brewery
        var cardDiv = $("<div class= 'card' style='width: 18rem;'>");
        var cardBody = $("<div class= 'card-body border-dark shadow p-1 mb-2'>");
        cardDiv.append(cardBody);
        //Populates brewery name and appends to breweryDiv
        var breweryName = response[i].name;
        var pOne = $("<h4 class= 'card-title'>").text(breweryName);
        
        cardBody.append(pOne);
        //Populates brewery address and appends to breweryDiv
        var breweryStreet = response[i].street;
        var breweryCity = response[i].city;
        var breweryState = response[i].state;
        var breweryZip = response[i].postal_code;
        var pTwo = $("<p class= 'card-text'>").text("Address: " + breweryStreet + ", " + breweryCity + ", " + breweryState + " " + breweryZip);
        
        cardBody.append(pTwo);
        //Populates brewery phone and appends to breweryDiv
        var breweryPhoneResponse = response[i].phone;
        var breweryPhone1 = breweryPhoneResponse.slice(0,3);
        var breweryPhone2 = breweryPhoneResponse.slice(3,6);
        var breweryPhone3 = breweryPhoneResponse.slice(6,10);
        
        var pThree = $("<p class= 'card-text'>").text("Phone Number: " + breweryPhone1 + "-" + breweryPhone2 + "-" + breweryPhone3);
        cardBody.append(pThree);
        //Populates brewery website and appends to breweryDiv
        var breweryWeb = response[i].website_url;
        var pFour = $("<p class= 'card-text'>").text("Website: " + breweryWeb);
        cardBody.append(pFour);
        $("#outputInfo").prepend(cardBody);
        }
    });
}