// // $(window).on('load', function () {
// //     $('.modal').modal('show')
// // })


$(document).ready(function () {



    //             var key = "JCSwBfoESyxmXiCPDgTBHPPDkUWm9rDw";

    //             $.ajax({
    //                 url: "http://www.mapquestapi.com/traffic/v2/markets?key=" + key,
    //                 method: 'GET',


    //             }).then(function (url) {


    //                 console.log(url)
    //             });

    //Onclick that takes the city name input and uses it in citySearch function
    $("#select-city").on("click", function (event) {

        event.preventDefault();

        var city = $("#city-input").val().trim();
        console.log(city)
        citySearch(city);
    });

    $(".btn-dark").on("click", function (event) {

        event.preventDefault();

        console.log("OK");
    })

    //Uses city from input to call API and returns results to screen
    function citySearch(city) {
        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //For loop to run through all responses
            for (i = 0; i < response.length; i++) {

                //Creates a cardbody and div to hold brewery
                var cardDiv = $("<div class= 'card' style='width: 18rem;'>");
                var cardBody = $("<div class= 'card-body border-dark shadow p-1 mb-2'>");
                cardDiv.append(cardBody);

                //Populates brewery name and appends to breweryDiv
                var breweryName = response[i].name;

                var pOne = $("<p class= 'card-title'>").text(breweryName);

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
                var breweryPhone1 = breweryPhoneResponse.slice(0, 3);
                var breweryPhone2 = breweryPhoneResponse.slice(3, 6);
                var breweryPhone3 = breweryPhoneResponse.slice(6, 10);

                var pThree = $("<p class= 'card-text'>").text("Phone Number: " + breweryPhone1 + "-" + breweryPhone2 + "-" + breweryPhone3);

                cardBody.append(pThree);

                //Populates brewery website and appends to breweryDiv
                var breweryWeb = response[i].website_url;

                var pFour = $("<p class= 'card-text'>").text("Website: " + breweryWeb);

                cardBody.append(pFour);

                var mapButton = $("<button type='button' class='btn btn-dark' id='mapBtn'>").text("Get a Map!");

                cardBody.append(mapButton);

                var brewLat = response[i].latitude;
                var brewLong = response[i].longitude;

                $("#outputInfo").prepend(cardBody);

                $(mapButton).click(function () {
                    var platform = new H.service.Platform({
                        'apikey': 'fBvknYTFknJqdfBiyf0aVH5JZjD2I_nlAFsE-GJWSX0'
                    });
                
                    // Obtain the default map types from the platform object:
                    var defaultLayers = platform.createDefaultLayers();
                
                    // Instantiate (and display) a map object:
                    var map = new H.Map(
                        document.getElementById('outputInfo'),
                        defaultLayers.vector.normal.map,
                        {
                            zoom: 12,
                            center: { lat: brewLat, lng: brewLong }
                        });
                
                    var ui = H.ui.UI.createDefault(map, defaultLayers);
                    $("#mapOutput").prepend(map);
                   // mapOutput.append(map);
                
                });
                    //maps call
                    //pass throuhg lat and long
                    //print the page
                    //window.location.href = 'map.html';

                
            }

        });
    }

    function gameSearch() {
        var today = moment().format("YYYY-MMM-DD");
        var queryURL = "https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/" + today + "?key=fc808d63943042c7a02880b2a3773b43";

        //Run AJAX call 

        $.ajax({
            url: queryURL,
            method: "GET"
        })


            .then(function (response) {

                var count = response.length;

                for (var i = 0; i < response.length; i++) {

                    var gameMoment = moment(response[i].DateTime).format("h" + ":" + "hh A");

                    var gameDiv = $("<div class='gameDiv'" + i + "></div>");
                    var teamsP = $("<p class='col-sm'></p>").text(response[i].AwayTeam + " @ " + response[i].HomeTeam);
                    var timeP = $("<p class='col-sm'></p>").text(gameMoment);
                    var statusP = $("<p class='col-sm'></p>").text(response[i].Status);

                    //$("#sportsBar").append(teamsP, timeP, statusP);
                    gameDiv.append(teamsP, timeP, statusP);
                    $("#sportsBar").append(gameDiv);


                }


            });
    };
    gameSearch();



});





