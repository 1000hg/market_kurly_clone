const express = require("express");
const router = express.Router();
const guestController = require("../controller/guest.js");

router.post("/add", guestController.addToCart);

router.get("/list", guestController.getCart);

router.get("/count", guestController.countCart);

router.put("/update", guestController.updateCart);

router.delete("/del", guestController.delCart);

module.exports = router;
