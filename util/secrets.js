const dotenv = require("dotenv");

dotenv.config();

module.exports.PORT = process.env.PORT;
module.exports.BASE_URL = process.env.BASE_URL;
module.exports.MONGO_URI = process.env.MONGO_URI;
module.exports.JWT_SECRET = process.env.JWT_SECRET;
module.exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
module.exports.GOOGLE_CLIENT_SEC = process.env.GOOGLE_CLIENT_SEC;
module.exports.COOKIE_KEY = process.env.COOKIE_KEY;
