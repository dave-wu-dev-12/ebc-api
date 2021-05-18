let express = require("express"); // looks into the node modules to find it
let router = express.Router();
let PowerBillUser = require("../models/powerBillUser");

router.post("/", validatePowerBillUser, async (req, res) => {
  try {
    const powerBillUser = new PowerBillUser(req.body);
    const newPowerBillUser = await powerBillUser.save();
    res.status(201).send(newPowerBillUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

function validatePowerBillUser(req, res, next) {
  try {
    isValid = true;

    let zipCode = req.body.zipcode.trim();
    let invalidZipCodes = ["11111", "00000"];
    let nonQualifyingZipCodes = ["60606", "60607"];

    let errorList = [];

    if (
      zipCode == "" ||
      zipCode.length < 5 ||
      zipCode.length > 5 ||
      invalidZipCodes.includes(zipCode)
    ) {
      errorList.push("Invalid zipcode");
      isValid = false;
    } else if (nonQualifyingZipCodes.includes(zipCode)) {
      errorList.push("zipcode provided does not qualify for this program");
      isValid = false;
    }

    if (!isValid) {
      return res.status(400).send({ message: errorList.toString() });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = router;
