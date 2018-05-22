const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const mongooseUrl = "mongodb://localhost:27017/simple-blogging";
mongoose.connect(mongooseUrl);
