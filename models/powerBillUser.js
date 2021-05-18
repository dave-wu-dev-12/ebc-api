let mongoose = require("mongoose");

const powerBillUserSchema = new mongoose.Schema({
  zipcode: { type: String, required: true },
  homeownerStatus: Boolean,
  monthlyPowerBill: { type: String },
  doesNotQualify: Boolean,
});

module.exports = mongoose.model("PowerBillUser", powerBillUserSchema);
