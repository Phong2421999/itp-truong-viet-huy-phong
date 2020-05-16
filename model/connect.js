var mongoose = require("mongoose");
var DATA_COLLECTION = process.env.DATA_COLLECTION;
mongoose.connect(`mongodb://localhost:27017/${DATA_COLLECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
