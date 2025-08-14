const mongoose = require("mongoose"); // import module
require('dotenv').config({ path: '.env.local' });
mongoose.connect(process.env.MONGOOSE_URL);