
// Get the date
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

var todays_date = yyyy + "-" + mm + "-" + dd;


var times = [
    "complies",
    "laudes",
    "lectures",
    "none",
    "sexte",
    "tierce",
    "vepres"
]

var alternate_names = {
    "matins": "lectures", //Office of Readings
    "laudes": "laudes", //Morning Prayer
    "terce": "tierce", // Midmorning Prayer
    "sext": "sexte", // Midday Prayer
    "none": "none", // Afternoon Prayer
    "vespers": "vepres", // Evening prayer
    "compline": "complies" // Night Prayer
}

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const hour = urlParams.get('hour');

if (Object.keys(alternate_names).indexOf(hour) > -1) {
    document.title = "Divine Office | " + hour.charAt(0).toUpperCase() + hour.slice(1);
    fetch("https://api.aelf.org/v1/" + alternate_names[hour] + "/" + todays_date + "/canada")
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(
            data => {

                //data = response_data.json()

                console.log(data);

                french_hour = alternate_names[hour];

                var full_liturgy = "";

                Object.keys(data[french_hour]).forEach(function (key) {
                    var value = data[french_hour][key];
                    full_liturgy += value + "<br>";
                });

                document.getElementById("body").innerHTML = full_liturgy;

            }



        );
    //document.getElementById("title").innerHTML = "Divine Office | " + hour.charAt(0).toUpperCase() + hour.slice(1);
} else {
    document.title = "Divine Office | Error";
}