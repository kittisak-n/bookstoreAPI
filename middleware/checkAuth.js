const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.Authentication
  try {
    if (!token) throw '';
    const user = await jwt.verify(token, "U0NCVGVjaFg=");
    req.ac_id = user.ac_id;
    req.user = user.username;
    next()
  } catch (e) {
    res.status(401).send('Unauthorized');
  }
}