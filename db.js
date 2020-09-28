const spicedPg = require("spiced-pg");
// const { dbUser, dbPass } = require("./secrets.json");
// const db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/petition`);
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:august:postgres@localhost:5432/personalpetition` // changed from petition to personalpetition
);

// add functions here

// copied from lecture notes:

module.exports.insertNamesAndSignature = (first, last, signature) => {
    console.log("insertNamesAndSignature ran!");
    return db.query(
        `INSERT INTO signatures (first, last, signature) VALUES ($1, $2, $3) RETURNING id`,
        [first, last, signature]
    );
};

// module.exports.getSignatures = () => {
//     console.log("getSignatures ran!");
//     return db.query("SELECT * FROM signatures");
// };

// db.query("SELECT * FROM cities") // change "cities" to the relevant table row/column
//     .then(function () {
//         console.log("yay!");
//     })
//     .catch((e) => console.log(e));

exports.getCitiesByCityName = (name) => {
    return db.query(
        `SELECT * FROM cities
            WHERE city = $1`,
        [name]
    );
};

module.exports.findSignature = (signatureId) => {
    return db.query(
        `SELECT signature FROM signatures
        WHERE id = $1`,
        [signatureId]
    );
};

module.exports.createUser = function (first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};

module.exports.findPassword = function (currentUserId) {
    return db.query("SELECT password FROM users WHERE id = $1", [
        currentUserId,
    ]);
};

// questions:
// where in the code do you control which table of a given database you are accessing?
