const express = require("express");
const app = express();
// const cookieParser = require("cookie-parser"); // not needed according to Alistair on 17.06.2020
const hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");
const projects = require("./projects");
const cookieSession = require("cookie-session");

const {
    requireLoggedOutUser,
    requireNoSignature,
    requireSignature,
    requireLoggedInUser,
} = require("./middleware.js");

const db = require("./db.js");

const { hash, compare } = require("./bc.js");

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14, // common practice to set a time limit for your cookie (fb cookies mostly never expire, in a bank perhaps a 5 minute age to the cookie, you get logged out after 5 min of inactivity. reset to 0 after every interaction) any number can go here
    })
);

app.use(express.static("./static"));
app.use(express.static("./public")); // see if this works
app.use(express.static(__dirname + "/projects"));
app.use(express.static(__dirname + "/public"));

// optional middleware
// app.use(requireLoggedInUser);
// app.use(requireLoggedOutUser);

// ############################################ //
// ############### SLASH ROUTE ################ //
// ############################################ //

app.get("/", (req, res) => {
    req.session.dill = "bigSecret99";
    res.redirect("/register");
});

// ############################################ //

app.get("/pages/carousel/index.html", (req, res) => {
    res.sendFile(`${__dirname}/pages/carousel/index.html`);
});

// ############################################ //
// ############### ABOUT PAGE ################# //
// ############################################ //

app.get("/about", (req, res) => {
    res.render("about", {});
});

// ############################################ //
// ############## THANKS PAGE ################# //
// ############################################ //

app.get("/thanks", (req, res) => {
    db.findSignature(req.session.sigId)
        .then((result) => {
            console.log(
                "GET /thanks db.findSignature successful result.rows",
                result.rows[0].signature
                // add rendering here
            );
            res.render("thanks", {
                signature: result.rows[0].signature,
            });
        })
        .catch((error) => {
            console.log("GET /thanks db.findSignature unsuccessful", error);
        });
});

// ############################################ //
// ############## SIGNERS PAGE ################ //
// ############################################ //

app.get("/signers", (req, res) => {
    res.render("signers", {});
});

// ############################################ //
// ############# REGISTRATION PAGE ############ //
// ############################################ //

app.get("/register", requireLoggedOutUser, (req, res) => {
    res.render("register", {});
});

app.post("/register", requireLoggedOutUser, (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (firstname && lastname && email && password) {
        hash(req.body.password)
            .then((hashed) => {
                // const { first, last, email } = req.body;
                db.createUser(
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

// ################################################ //
// ################# LOGOUT ROUT ################## //
// ################################################ //

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

// ################################################ //
// ################# LOGIN PAGE ################### //
// ################################################ //

app.get("/login", requireLoggedOutUser, (req, res) => {
    res.render("login", {});
});

app.post("/login", requireLoggedOutUser, (req, res) => {
    const { email, password } = req.body;
    let userId;
    db.findPassword(email)
        .then((result) => {
            // if (result.rows.length == 0) {
            //     res.json(false);
            // }
            const hashedPassword = result.rows[0].password;
            userId = result.rows[0].id; // possibly rename id
            return compare(password, result.rows[0].password);
        })
        .then((isMatch) => {
            if (isMatch) {
                req.session.userId = userId;
                res.redirect("/petition");
            } else {
                const error = "incorrect credentials, please re-enter";
                res.render("login", { error });
            }
        })
        .catch((err) => {
            const error = "incorrect credentials, please re-enter";
            res.render("login", { error });
        });
});

// ################################################ //
// ############# PETITION SIGNING PAGE ############ //
// ################################################ //

app.get("/petition", requireLoggedInUser, (req, res) => {
    res.render("petition", {});
});

app.post("/petition", requireLoggedInUser, (req, res) => {
    if (req.body.signature) {
        // console.log("req.body test", req.body);
        db.insertSignature(res.session.userId, req.body.signature)
            .then((result) => {
                // console.log("resultssss", result);
                // console.log("result.rows", result.rows);
                req.session.sigId = result.rows[0].id;
                res.redirect("/thanks");
            })
            .catch((error) => {
                console.log("errorsssss", error);
            });
    } else {
        res.render("petition", {
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
