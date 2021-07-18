const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const CustomerControllers = require("../controllers/customer");

router.get(
  "/all",
  async (req, res) => {
    try {
      await CustomerControllers.getAllCustomers(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);


router.get(
  "/:username",
  async (req, res) => {
    try {
      await CustomerControllers.getCustomer(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.get(
  "/check/:username",
  async (req, res) => {
    try {
      await CustomerControllers.checkUsernameAvailability(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.put("/",
  async (req, res) => {
    try {
      await CustomerControllers.createCustomer(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.delete("/:username",
  async (req, res) => {
    try {
      await CustomerControllers.deleteCustomer(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

module.exports = router;
