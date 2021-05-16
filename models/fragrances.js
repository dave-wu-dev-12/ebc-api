let mongoose = require("mongoose");

const fragranceSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: String, required: true },
  concentration: { type: String, required: true },
  batchCode: { type: String, required: true },
});

module.exports = mongoose.model("Fragrance", fragranceSchema);
