// routes/baseRouter.js
const express = require("express");

module.exports = (controller) => {
  const router = express.Router();
  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.delete("/:id", controller.delete);
  return router;
};
