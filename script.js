
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
                hour_data = data[french_hour];

                $("body").append(hour_data["introduction"]);
                try {
                    $("body").append(psalm_to_html(hour_data["antienne_invitatoire"], hour_data["psaume_invitatoire"]));
                } catch (error) {
                    console.log(error);
                }

                //TODO: Add hymns

                $("body").append("<br><br><br>Hymn<br><br><br>");

                for (var i = 1; i < 4; i++) {
                    try {
                        $("body").append(psalm_to_html(hour_data["antienne_" + i], hour_data["psaume_" + i]));

                    } catch (error) {
                        console.log(error);
                    }

                }


                /*
                                $("body").append(hour_data["antienne_1"]);
                                $("body").append(psalm_to_html(hour_data["psaume_1"]));
                                $("body").append(hour_data["antienne_1"]);
                                $("body").append("<br>")
                
                                if (hour_data["psaume_2"].length > 0) {
                                    $("body").append(hour_data["antienne_2"]);
                                    $("body").append(psalm_to_html(hour_data["psaume_2"]));
                                    $("body").append(hour_data["antienne_2"]);
                                    $("body").append("<br>")
                                }
                
                                try {
                                    $("body").append(hour_data["antienne_3"]);
                                    $("body").append(psalm_to_html(hour_data["psaume_3"]));
                                    $("body").append(hour_data["antienne_3"]);
                                    $("body").append("<br>")
                                } catch (error) {
                                    //No third psalm - for compline
                                }*/

            }



        );
    //document.getElementById("title").innerHTML = "Divine Office | " + hour.charAt(0).toUpperCase() + hour.slice(1);
} else {
    document.title = "Divine Office | Error";
    $("body").append("<p>The listed hour couldn't be found! Please go back in your browser and select a proper hour!</p>");
}


function psalm_to_html(antiphon, psalm) {
    psalm_html = ""

    if (antiphon != "") psalm_html += "<p><i>" + antiphon.replace("<p>", "").replace("</p>", "") + "</i></p>";


    if (psalm["reference"].toUpperCase().includes("CANTIQUE")) {
        psalm_html += "<h3>" + psalm["reference"] + "</h3>";
    } else {
        psalm_html += "<h3>Psalm " + psalm["reference"] + "</h3>";
    }
    psalm_html += psalm["texte"].substring(0, psalm["texte"].length - 4) + "<br><br>Glory to the Father and to the Son<br>and to the Holy Spirit.<br>As it was in the beginning, is now<br>and will be forever. Amen.</p>";

    if (antiphon != "") psalm_html += "<p><i>" + antiphon.replace("<p>", "").replace("</p>", "") + "</i></p>";

    psalm_html += "<br>";

    console.log(psalm_html);

    return psalm_html;


}