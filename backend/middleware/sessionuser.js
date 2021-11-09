const jwt = require("jsonwebtoken");

const sessionuser = (req, res, next) => {
  // Get the user from jwt and add the id to the req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "please authincate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "please authincate using a valid token" });
  }
};

module.exports = sessionuser;
