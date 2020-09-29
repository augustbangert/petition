const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser"); // not needed according to Alistair on 17.06.2020
const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");
const projects = require("./projects");
const cookieSession = require("cookie-session");
const {
    insertNamesAndSignature,
    findSignature,
    getSignatures,
    createUser,
    findPassword,
} = require("./db.js");
const { hash, compare } = require("./bc.js");

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14, // any number can go here
    })
);

app.use(express.static("./static"));
app.use(express.static("./public")); // see if this works
app.use(express.static(__dirname + "/projects"));
app.use(express.static(__dirname + "/public"));

// from encounter with Alistair 17.06
app.get("/", (req, res) => {
    // console.log("get to root");
    // console.log("req.session before value set", req.session);
    req.session.dill = "bigSecret99";
    // console.log("req.session after value set", req.session);
    // res.send(`<h1>Welcome to the homepage</h1>`);
    res.redirect("/register");
});

app.get("/pages/carousel/index.html", (req, res) => {
    res.sendFile(`${__dirname}/pages/carousel/index.html`);
});

app.get("/about", function (req, res) {
    res.render("about", {
        name: "kitty",
    });
});

// petition page get
app.get("/petition", function (req, res) {
    res.render("petition", {
        name: "kitty",
    });
});

// thanks page get
// this may not be correct
app.get("/thanks", function (req, res) {
    // console.log("/thanks req.session", req.session);
    findSignature(req.session.sigId)
        .then((result) => {
            console.log(
                "GET /thanks findSignature successful result.rows",
                result.rows[0].signature
                // add rendering here
            );
            res.render("thanks", {
                signature: result.rows[0].signature,
            });
        })
        .catch((error) => {
            console.log("GET /thanks findSignature unsuccessful", error);
        });
});

// signers page get
app.get("/signers", function (req, res) {
    res.render("signers", {
        name: "kitty",
    });
});

app.get("/register", function (req, res) {
    res.render("register", {
        name: "kitty",
    });
});

app.get("/login", function (req, res) {
    res.render("login", {
        name: "kitty",
    });
});

app.post("/register", function (req, res) {
    // console.log("req.body", req.body);
    const { firstname, lastname, email, password } = req.body;
    if (firstname && lastname && email && password) {
        hash(req.body.password)
            .then((hashed) => {
                // const { first, last, email } = req.body;
                createUser(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hashed
                )
                    .then((result) => {
                        req.session.id = result.rows[0].id;
                        res.redirect("/petition");
                    })
                    .catch((error) => {
                        console.log("error creating this user");
                        console.log(error);
                    });
            })
            .catch((error) => {
                res.render("petition", {
                    error: "An error occured connecting to the database!",
                });
            });
    } else {
        res.render("register", {
            error: "Please resubmit with all fields entered!",
        });
    }
});

app.post("/login", function (req, res) {
    // let hashedUserPasswordFromDB; // trying 'let' for now
    console.log("LOGIN SUBMIT RAN");
    console.log("req.body.password", req.body.password); //works!
    console.log("req.body.email", req.body.email); //works!
    // findPassword(req.body.password).then().catch();
    //compare takes two argument, clear text and hash to compare against
    // compare(req.body.password, hashedUserPasswordFromDB);
});

// petition page post
app.post("/petition", function (req, res) {
    // console.log(".post was successful to /petition (aka petition home page!)");
    // console.log("req.body.firstname", req.body.firstname);
    if (req.body.firstname && req.body.lastname && req.body.signing) {
        // console.log("req.body test", req.body);
        const { firstname, lastname, signing } = req.body;
        insertNamesAndSignature(firstname, lastname, signing)
            .then((result) => {
                // console.log("resultssss", result);
                // console.log("result.rows", result.rows);
                req.session.sigId = result.rows[0].id;
                res.redirect("/thanks");
            })
            .catch((error) => {
                console.log("errorsssss", error);
            });
        // this also works!! here you should make sure you have all fields full and then record the data to sql table
        // res.cookie("theUserSigned", true); // commented out bc of cookiesession replacement
    } else {
        // this works!!
        res.render("petition", {
            name: "kitty",
            emojis: ["🐔", "🐔"],
            errors: ["error: please resubmit"],
        });
    }
    // if success, then set 'signed' cookie and direct to /thanks
    // if fail, then redirect to /petition again with errors: ["form not complete!"]
});

app.listen(process.env.PORT || 8080, () => console.log("petition is running"));

// ############### //
// copied from my used provided code, file path:
// /home/august/Documents/spiced/dill-code/jun8_12/jun8/express-project/index-from-class.js
// ############### //
// copied from provided code, https://spiced.space/dill/gist/40
// ############### //

// // 5 ways to send responses with express
// // res.send() → expects to be passed an html snippet or text and sends that as a response
// // res.sendFile() → expects as an argument the path to a file that should be sent as a response
// // res.redirect() → expexts to be passed a route to redirect to, i.e. res.redirect('/') . Makes redirecting nice and easy :)
// // res.json() → sends json as a response. We won't work with this until we get to frameworks in 2 - 3 weeks
// // res.render() → we'll learn about this one tomorrow.

// ######## POSTGRESQL COMMANDS ######## //
// psql // login into postgresql
// \l tables // lists databases
// \q // quits postgresql
// createdb databasename // creates database
// CREATE DATABSE databasename // creates database
// psql -d databasename // opens database
// psql -d databasename -f tablename.sql // creates a table in the specified database
// \c databasename // opens database
// \dt // lists the table in the current database
// sudo -u postgres psql -U postgres // login as desired user
// sudo su postgres // login as postgres user
// DROP DATABASE [IF EXISTS] databasename; // deletes database
// DROP USER [IF EXISTS] username; // deletes user
// DROP DATABASE databasename; // deletes database
// SELECT * FROM tablename; // displays (in psql) the contents of the table
// sudo service postgresql start // starts Postgres

// ######### NODE COMMANDS ######### //
// nvm ls // lists available node versions
// nvm use 12.18.1 // switches to a different node version
// node -v // prints the node version that is currently in use

// I created a data base called myfirstdatabase
// NEED TO:
// create a db.js file with SQL table instertion functions
// require the file inside of the index.js
// use destrucuring to get the function from db.js
// create and if statement inside of the .post() function where:
// if all of the fields are filled upon submittion, the insertion function(promise?) runs

// something with the db object is wrong, cannot connect to the database.
// the connection somehow not working, because when I use the .query method,
// a promise, then, or catch error is not logged to the console, as my code says!
// 5432 is the default port for postgres, so no problem there
// maybe the default port or another setting is changed on ubuntu18.04
// http://localhost:5432/petition doesnt run anything
//
// there is a possibility that the roles are not set on my sql user
// we created a new database (with now permission locks), new table, checked the columns

// all functions are exporting properly
// on mouse down: turn on mouse over
// on mouse up: turn off the mouse over

// august:petition$ psql -f signatures.sql
//  id | first | last | signature
// ----+-------+------+-----------
//   1 | a     | b    | signature
//   2 | a     | b    | signature
// (2 rows)
