function requireLoggedOutUser(req, res, next) {
    if (req.session.userId) {
        res.redirect("/petition");
    } else {
        next();
    }
}

function requireNoSignature(req, res, next) {
    if (req.session.signatureId) {
        res.redirect("/thanks");
    } else {
        next();
    }
}

function requireSignature(req, res, next) {
    if (!req.session.signatureId) {
        res.redirect("/petition");
    } else {
        next();
    }
}

function requireLoggedInUser(req, res, next) {
    if (!req.session.userId && req.url != "/register" && req.url != "/login") {
        res.redirect("/register");
    } else {
        next();
    }
}

exports.requireLoggedOutUser = requireLoggedOutUser;
exports.requireNoSignature = requireNoSignature;
exports.requireSignature = requireSignature;
exports.requireLoggedInUser = requireLoggedInUser;
