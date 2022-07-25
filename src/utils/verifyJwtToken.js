const jwt = require("jsonwebtoken");

const jwtVerify = (token, req, res, next) => {
  jwt.verify(token, process.env.JWT_SECRETE_TOKEN, (error, userId) => {
    if (error) return res.json({ errorMessage: error.message });
    req.id = userId;
    next();
  });
};

const verifyJwtToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader === "undefined") {
    return res.json({ errorMessage: "Token undefined" });
  }
  const bearer = authHeader.split(" ");
  const authToken = bearer[1];
  jwtVerify(authToken, req, res, next);
};

module.exports = { verifyJwtToken };
