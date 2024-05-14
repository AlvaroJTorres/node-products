const jwt = require("jsonwebtoken");
const jwtDataOptions = {
    secret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION,
}
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: "Unauthorized! Access Token expired!" });
  }
  return res.sendStatus(401).json({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"]
  if(!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let token = header.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, jwtDataOptions.secret, (err, decoded) => {
    if (err) {
      catchError(err, res);
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
    verifyToken,
}