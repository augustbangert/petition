const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));

app.get("/", (request, response) => {
    response.render("home", {
        layout: null,
        cohort: "Dill",
        teachers,
    });
});

app.get("/about", (request, response) => {
    response.render("about", {
        layout: null,
        written-emojis: [
            "<3", ":)", "XD"
        ]
    });
});

app.listen(8080, () => console.log("server listening!"));

// res.send() → expects to be passed an html snippet or text and sends that as a response
// res.sendFile() → expects as an argument the path to a file that should be sent as a response
// res.redirect() → expexts to be passed a route to redirect to, i.e. res.redirect('/') . Makes redirecting nice and easy :)
// res.json() → sends json as a response. We won't work with this until we get to frameworks in 2 - 3 weeks
// res.render() → we'll learn about this one tomorrow.
