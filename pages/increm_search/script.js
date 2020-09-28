(function () {
    // ######### PART 1 ######### //
    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Angola",
        "Anguilla",
        "Antigua",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire (Netherlands Antilles)",
        "Bosnia Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo, The Democratic Republic of",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Curacao (Netherlands Antilles)",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iraq",
        "Ireland (Republic of)",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kosrae Island",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia (FYROM)",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Moldova",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Ponape",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Rota",
        "Russia",
        "Rwanda",
        "Saba (Netherlands Antilles)",
        "Saipan",
        "Samoa",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St. Barthelemy",
        "St. Croix",
        "St. Eustatius (Netherlands Antilles)",
        "St. John",
        "St. Kitts and Nevis",
        "St. Lucia",
        "St. Maarten (Netherlands Antilles)",
        "St. Thomas",
        "St. Vincent and the Grenadines",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Tinian",
        "Togo",
        "Tonga",
        "Tortola",
        "Trinidad and Tobago",
        "Truk",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos",
        "Tuvalu",
        "US Virgin Islands",
        "Uganda",
        "Ukraine",
        "Union Island",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Virgin Gorda",
        "Wallis and Futuna",
        "Yap",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];
    var inputField = $("input");
    var countriesContainer = $(".countries-container");
    var resultsDiv = $("#results-div");

    inputField.on("input", function () {
        // .on here attaches an event handler to inputfield
        // 1. capture the user's input // instructor
        var userInput = inputField.val(); // the value entered in the inputfield is stored in the userinput variable

        var results = []; // this is the array to be returned for the incremental search feature
        // 2. grab the countries from the array that match the user's input // instructor
        for (var i = 0; i < countries.length; i++) {
            // loops through the countries array
            if (
                countries[i].toLowerCase().indexOf(userInput.toLowerCase()) ===
                0 // indexOf gives u the index # of the first appearance of a string in a given string.
            ) {
                //if the string appears at index #0 of the countries value (index i), then push to the result array
                results.push(countries[i]);
            }
            if (results.length === 4) {
                //once 4 characters have been pushed to the array, the loop breaks
                break;
            }
        } // for loop ends here

        // 3. take those countries and append them to the DOM
        var htmlToAppendToDom = "";

        console.log("results", results);

        // for (var i = 0; i < results.length; i++) {
        //     //loops through results array and adds characters to a variable
        //     htmlToAppendToDom += '<p class="country">' + results[i] + "</p>";
        // }

        for (var i = 0; i < results.length; i++) {
            // ###### TEST to replace lines 258-261 ####
            //loops through results array and adds characters to a variable
            htmlToAppendToDom +=
                "<p class='country' id='country-no-" +
                i +
                "'>" +
                results[i] +
                "</p>";
        }

        if (userInput === "") {
            // When the input field is blank, show nothing
            htmlToAppendToDom = "";
        }

        if (results == 0) {
            //when there are no results, render a "no results" message
            htmlToAppendToDom = "no results";
        }

        resultsDiv.html(htmlToAppendToDom); // .html changes the content of specified elements, in this case changes the countries container

        // ######## PART 2 ########## //

        $("#country-no-0").mouseover(function () {
            // following lines create a colored element when mousedover
            $("#country-no-0").css("color", "white");
            $("#country-no-0").css("background-color", "blue");
        });

        $("#country-no-1").mouseover(function () {
            $("#country-no-1").css("color", "white");
            $("#country-no-1").css("background-color", "blue");
        });

        $("#country-no-2").mouseover(function () {
            $("#country-no-2").css("color", "white");
            $("#country-no-2").css("background-color", "blue");
        });

        $("#country-no-3").mouseover(function () {
            $("#country-no-3").css("color", "white");
            $("#country-no-3").css("background-color", "blue");
        });

        $("#country-no-0").mouseout(function () {
            $("#country-no-0").css("color", "black");
            $("#country-no-0").css("background-color", "white");
        });

        $("#country-no-1").mouseout(function () {
            $("#country-no-1").css("color", "black");
            $("#country-no-1").css("background-color", "white");
        });

        $("#country-no-2").mouseout(function () {
            $("#country-no-2").css("color", "black");
            $("#country-no-2").css("background-color", "white");
        });

        $("#country-no-3").mouseout(function () {
            $("#country-no-3").css("color", "black");
            $("#country-no-3").css("background-color", "white");
        });

        // for (var i = 0; i < 4; i++) {
        //     var elementIndex = $("#country-no-" + i);
        //     $(elementIndex).mouseover(function () {
        //         $(elementIndex).css("color", "white");
        //         $(elementIndex).css("background-color", "blue");
        //     });

        //     $(elementIndex).mouseout(function () {
        //         $(elementIndex).css("color", "black");
        //         $(elementIndex).css("background-color", "white");
        //     });
        // }

        // ########### PART 3 ########### //

        $("#country-no-0").mousedown(function () {
            //same problem as part 2, I cannot figure out how to reference the event object, so I don't see a way to create a loop that breaks at the appropriate index.
            inputField.val(results[0]);
        });

        $("#country-no-1").mousedown(function () {
            inputField.val(results[1]);
        });

        $("#country-no-2").mousedown(function () {
            inputField.val(results[2]);
        });

        $("#country-no-3").mousedown(function () {
            inputField.val(results[3]);
        });

        // ######### PART 4 ######### //

        // did not get to this in time

        // ######### PART 5 ######### //
        // the results are already displayed from line 1

        // ######### PART 6 ######### //
        $(document).on("click", function (e) {
            if (e.target.id != "inputID") {
                resultsDiv.html("");
            }
        });
    });
})();
