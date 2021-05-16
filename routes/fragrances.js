let express = require("express"); // looks into the node modules to find it
let router = express.Router();
let Fragrance = require("../models/fragrances");

router.get("/", async (req, res) => {
  try {
    const fragrances = await Fragrance.find();
    res.status(200).send(fragrances);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", getFragranceById, async (req, res) => {
  res.send(res.fragrance);
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const fragrance = new Fragrance(req.body);
    const newFragrance = await fragrance.save();
    res.status(201).send(newFragrance);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let update = await Fragrance.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (update == null) {
      const fragrance = new Fragrance(req.body);
      update = await fragrance.save();
    }
    res.status(201).send(update);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete("/:id", getFragranceById, async (req, res) => {
  try {
    res.fragrance.remove();
    res.send({ message: "Deleted Fragrance" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// middleware for obtaining fragrance by id and also providing error handling
// of ids not being found

// this middleware can  be added to the routes above
// requests will first go to the middle ware and then the middleware
// will pass it onto the CRUD route using the middleware through the next call
// we store information for the CRUD route in the response

// the returns will short circuit the call and make it stop at the middleware

// we use the function decorator and not the es6 one to avoid the placement error

async function getFragranceById(req, res, next) {
  try {
    const id = req.params.id;
    const fragrance = await Fragrance.findById(id);
    if (fragrance == null)
      return res
        .status(404)
        .send({ message: `unable to find fragrance with id ${id}` });

    res.fragrance = fragrance;
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = router;
