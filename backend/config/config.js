require("dotenv").config();

exports.config = {
  NODE_ENVIROMENT: process.env.NODE_SERVER || "production",
  PORT: process.env.PORT || 8000,
  MONGO_URL: process.env.MONGO_URL,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE,
  USER_PASSWORD: process.env.USER_PASSWORD,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  ACTIVATION_EXPIRE: process.env.ACTIVATION_EXPIRE,
  RESET_EXPIRE: process.env.RESET_TOKEN_EXPIRE,
};
const whiteList = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:7000",
];
//cors options

exports.corsOption = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      return callback(null, true);
    } else {
      return callback("Not Allowed by cors.");
    }
  },
  credentials: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};
