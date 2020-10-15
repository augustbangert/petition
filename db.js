const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
    `postgres:august:postgres@localhost:5432/personalpetition`
);

// module.exports.insertNamesAndSignature = (first, last, signature) => {
//     console.log("insertNamesAndSignature ran!");
//     return db.query(
//         `INSERT INTO signatures (first, last, signature) VALUES ($1, $2, $3) RETURNING id`,
//         [first, last, signature]
//     );
// };

module.exports.insertSignature = (userId, signature) => {
    console.log("insertSignature ran!");
    console.log("userId", userId);
    return db.query(`UPDATE users SET signature = $2 WHERE id = $1;`, [
        userId,
        signature,
    ]);
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

// exports.getCitiesByCityName = (name) => {
//     return db.query(
//         `SELECT * FROM cities
//             WHERE city = $1`,
//         [name]
//     );
// };

// module.exports.findSignature = (signatureId) => {
//     return db.query(
//         `SELECT signature FROM signatures
//         WHERE id = $1`,
//         [signatureId]
//     );
// };

module.exports.findSignature = (signatureId) => {
    return db.query(
        `SELECT signature FROM users
        WHERE id = $1`,
        [signatureId]
    );
};

module.exports.createUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};

module.exports.findPassword = (inputEmail) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [inputEmail]);
};

module.exports.getAllUsers = () => {
    return db.query(`SELECT * FROM users WHERE signature IS NOT NULL`, []);
};
// questions:
// where in the code do you control which table of a given database you are accessing?
