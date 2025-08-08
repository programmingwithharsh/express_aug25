const mongoose = require("mongoose"); // import module
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/ecommerce";
mongoose.connect(MONGOOSE_URL);